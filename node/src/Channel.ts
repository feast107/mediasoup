import * as os from 'os';
import { Duplex } from 'stream';
import * as flatbuffers from 'flatbuffers';
import { Logger } from './Logger';
import { EnhancedEventEmitter } from './EnhancedEventEmitter';
import { InvalidStateError } from './errors';
import { Body as RequestBody, Method, Request } from './fbs/request_generated';
import { Response } from './fbs/response_generated';
import { Message, Type as MessageType, Body as MessageBody } from './fbs/message_generated';
import { Notification, Body as NotificationBody, Event } from './fbs/notification_generated';
import { Log } from './fbs/log_generated';

const littleEndian = os.endianness() == 'LE';
const logger = new Logger('Channel');

type Sent =
{
	id: number;
	method: string;
	resolve: (data?: any) => void;
	reject: (error: Error) => void;
	close: () => void;
};

// Binary length for a 4194304 bytes payload.
const MESSAGE_MAX_LEN = 4194308;
const PAYLOAD_MAX_LEN = 4194304;

export class Channel extends EnhancedEventEmitter
{
	// Closed flag.
	#closed = false;

	// Unix Socket instance for sending messages to the worker process.
	readonly #producerSocket: Duplex;

	// Unix Socket instance for receiving messages to the worker process.
	readonly #consumerSocket: Duplex;

	// Next id for messages sent to the worker process.
	#nextId = 0;

	// Map of pending sent requests.
	readonly #sents: Map<number, Sent> = new Map();

	// Buffer for reading messages from the worker.
	#recvBuffer = Buffer.alloc(0);

	// flatbuffers builder.
	#bufferBuilder:flatbuffers.Builder = new flatbuffers.Builder(1024);

	/**
	 * @private
	 */
	constructor(
		{
			producerSocket,
			consumerSocket,
			pid
		}:
		{
			producerSocket: any;
			consumerSocket: any;
			pid: number;
		})
	{
		super();

		logger.debug('constructor()');

		this.#producerSocket = producerSocket as Duplex;
		this.#consumerSocket = consumerSocket as Duplex;

		// Read Channel responses/notifications from the worker.
		this.#consumerSocket.on('data', (buffer: Buffer) =>
		{
			if (!this.#recvBuffer.length)
			{
				this.#recvBuffer = buffer;
			}
			else
			{
				this.#recvBuffer = Buffer.concat(
					[ this.#recvBuffer, buffer ],
					this.#recvBuffer.length + buffer.length);
			}

			if (this.#recvBuffer.length > PAYLOAD_MAX_LEN)
			{
				logger.error('receiving buffer is full, discarding all data in it');

				// Reset the buffer and exit.
				this.#recvBuffer = Buffer.alloc(0);

				return;
			}

			let msgStart = 0;

			while (true) // eslint-disable-line no-constant-condition
			{
				const readLen = this.#recvBuffer.length - msgStart;

				if (readLen < 4)
				{
					// Incomplete data.
					break;
				}

				const dataView = new DataView(
					this.#recvBuffer.buffer,
					this.#recvBuffer.byteOffset + msgStart);
				const msgLen = dataView.getUint32(0, littleEndian);

				if (readLen < 4 + msgLen)
				{
					// Incomplete data.
					break;
				}

				const payload = this.#recvBuffer.subarray(msgStart + 4, msgStart + 4 + msgLen);

				msgStart += 4 + msgLen;

				const buf = new flatbuffers.ByteBuffer(new Uint8Array(payload));
				const message = Message.getRootAsMessage(buf);

				try
				{
					switch (message.type())
					{
						case MessageType.RESPONSE:
						{
							const response = new Response();

							message.data(response);

							this.processResponse(response);

							break;
						}

						case MessageType.NOTIFICATION:
						{
							const notification = new Notification();

							message.data(notification);

							this.processNotification(notification);

							break;
						}

						case MessageType.LOG:
						{
							const log = new Log();

							message.data(log);

							const logData = log.data()!;

							switch (logData[0])
							{
								// 'D' (a debug log).
								case 'D':
									logger.debug(`[pid:${pid}] ${logData.slice(1)}`);
									break;

								// 'W' (a warn log).
								case 'W':
									logger.warn(`[pid:${pid}] ${logData.slice(1)}`);
									break;

								// 'E' (a error log).
								case 'E':
									logger.error(`[pid:${pid}] ${logData.slice(1)}`);
									break;

								// 'X' (a dump log).
								case 'X':
									// eslint-disable-next-line no-console
									console.log(logData.slice(1));
									break;
							}

							break;
						}

						default:
							// eslint-disable-next-line no-console
							console.warn(
								`worker[pid:${pid}] unexpected data: %s`,
								payload.toString('utf8', 1));
					}
				}
				catch (error)
				{
					logger.error(
						'received invalid message from the worker process: %s',
						String(error));
				}
			}

			if (msgStart != 0)
			{
				this.#recvBuffer = this.#recvBuffer.slice(msgStart);
			}
		});

		this.#consumerSocket.on('end', () => (
			logger.debug('Consumer Channel ended by the worker process')
		));

		this.#consumerSocket.on('error', (error) => (
			logger.error('Consumer Channel error: %s', String(error))
		));

		this.#producerSocket.on('end', () => (
			logger.debug('Producer Channel ended by the worker process')
		));

		this.#producerSocket.on('error', (error) => (
			logger.error('Producer Channel error: %s', String(error))
		));
	}

	/**
	 * flatbuffer builder.
	 */
	get bufferBuilder(): flatbuffers.Builder
	{
		return this.#bufferBuilder;
	}

	/**
	 * @private
	 */
	close(): void
	{
		if (this.#closed)
			return;

		logger.debug('close()');

		this.#closed = true;

		// Close every pending sent.
		for (const sent of this.#sents.values())
		{
			sent.close();
		}

		// Remove event listeners but leave a fake 'error' hander to avoid
		// propagation.
		this.#consumerSocket.removeAllListeners('end');
		this.#consumerSocket.removeAllListeners('error');
		this.#consumerSocket.on('error', () => {});

		this.#producerSocket.removeAllListeners('end');
		this.#producerSocket.removeAllListeners('error');
		this.#producerSocket.on('error', () => {});

		// Destroy the socket after a while to allow pending incoming messages.
		setTimeout(() =>
		{
			try { this.#producerSocket.destroy(); }
			catch (error) {}
			try { this.#consumerSocket.destroy(); }
			catch (error) {}
		}, 200);
	}

	/**
	 * @private
	 */
	notify(
		event: Event,
		bodyType?: NotificationBody,
		bodyOffset?: number,
		handlerId?: string
	): void
	{
		logger.debug('notify() [event:%s]', Event[event]);

		if (this.#closed)
			throw new InvalidStateError('Channel closed');

		const handlerIdOffset = this.#bufferBuilder.createString(handlerId);

		let notificationOffset: number;

		if (bodyType && bodyOffset)
		{
			notificationOffset = Notification.createNotification(
				this.#bufferBuilder, handlerIdOffset, event, bodyType, bodyOffset);
		}
		else
		{
			notificationOffset = Notification.createNotification(
				this.#bufferBuilder, handlerIdOffset, event, NotificationBody.NONE, 0);
		}

		const messageOffset = Message.createMessage(
			this.#bufferBuilder,
			MessageType.NOTIFICATION,
			MessageBody.FBS_Notification_Notification,
			notificationOffset
		);

		this.#bufferBuilder.finishSizePrefixed(messageOffset);

		// Create a new buffer with this data so multiple contiguous flatbuffers
		// do not point to the builder buffer overriding others info.
		const buffer = new Uint8Array(this.#bufferBuilder.asUint8Array());

		// Clear the buffer builder so it's reused for the next request.
		this.#bufferBuilder.clear();

		// TODO: DEV. Remove.
		// const notif = Message.getRootAsMessage(new flatbuffers.ByteBuffer(buffer));
		// logger.warn(JSON.stringify(notif.unpack(), undefined, 2));

		if (buffer.byteLength > MESSAGE_MAX_LEN)
			throw new Error('Channel request too big');

		try
		{
			// This may throw if closed or remote side ended.
			this.#producerSocket.write(buffer, 'binary');
		}
		catch (error)
		{
			logger.warn('notify() | sending notification failed: %s', String(error));

			return;
		}
	}

	async request(
		method: Method,
		bodyType?: RequestBody,
		bodyOffset?: number,
		handlerId?: string): Promise<Response>
	{
		if (this.#closed)
			throw new InvalidStateError('Channel closed');

		this.#nextId < 4294967295 ? ++this.#nextId : (this.#nextId = 1);

		const id = this.#nextId;

		// TODO: DEV. Remove.
		logger.warn('request() [method:%s, id:%s]', Method[method], id);

		const handlerIdOffset = this.#bufferBuilder.createString(handlerId);

		let requestOffset: number;

		if (bodyType && bodyOffset)
		{
			requestOffset = Request.createRequest(
				this.#bufferBuilder, id, method, handlerIdOffset, bodyType, bodyOffset);
		}
		else
		{
			requestOffset = Request.createRequest(
				this.#bufferBuilder, id, method, handlerIdOffset, RequestBody.NONE, 0);
		}

		const messageOffset = Message.createMessage(
			this.#bufferBuilder,
			MessageType.REQUEST,
			MessageBody.FBS_Request_Request,
			requestOffset
		);

		this.#bufferBuilder.finishSizePrefixed(messageOffset);

		// Create a new buffer with this data so multiple contiguous flatbuffers
		// do not point to the builder buffer overriding others info.
		const buffer = new Uint8Array(this.#bufferBuilder.asUint8Array());

		// Clear the buffer builder so it's reused for the next request.
		this.#bufferBuilder.clear();

		// TODO: DEV. Remove.
		// const message = Message.getRootAsMessage(new flatbuffers.ByteBuffer(buffer));
		// logger.warn(JSON.stringify(message.unpack(), undefined, 2));

		if (buffer.byteLength > MESSAGE_MAX_LEN)
			throw new Error('Channel request too big');

		// This may throw if closed or remote side ended.
		this.#producerSocket.write(buffer, 'binary');

		return new Promise((pResolve, pReject) =>
		{
			const sent: Sent =
			{
				id      : id,
				method  : Method[method],
				resolve : (data2) =>
				{
					if (!this.#sents.delete(id))
						return;

					pResolve(data2);
				},
				reject : (error) =>
				{
					if (!this.#sents.delete(id))
						return;

					pReject(error);
				},
				close : () =>
				{
					pReject(new InvalidStateError('Channel closed'));
				}
			};

			// Add sent stuff to the map.
			this.#sents.set(id, sent);
		});
	}

	private processResponse(response: Response): void
	{
		const sent = this.#sents.get(response.id());

		if (!sent)
		{
			logger.error(
				'received response does not match any sent request [id:%s]', response.id);

			return;
		}

		if (response.accepted())
		{
			logger.debug(
				'request succeeded [method:%s, id:%s]', sent.method, sent.id);

			sent.resolve(response);
		}
		else if (response.error())
		{
			logger.warn(
				'request failed [method:%s, id:%s]: %s',
				sent.method, sent.id, response.reason());

			switch (response.error()!)
			{
				case 'TypeError':
					sent.reject(new TypeError(response.reason()!));
					break;

				default:
					sent.reject(new Error(response.reason()!));
			}
		}
		else
		{
			logger.error(
				'received response is not accepted nor rejected [method:%s, id:%s]',
				sent.method, sent.id);
		}
	}

	private processNotification(notification: Notification): void
	{
		// Due to how Promises work, it may happen that we receive a response
		// from the worker followed by a notification from the worker. If we
		// emit the notification immediately it may reach its target **before**
		// the response, destroying the ordered delivery. So we must wait a bit
		// here.
		// See https://github.com/versatica/mediasoup/issues/510
		setImmediate(() => this.emit(
			notification.handlerId()!,
			notification.event(),
			notification)
		);
	}
}
