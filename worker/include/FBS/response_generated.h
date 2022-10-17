// automatically generated by the FlatBuffers compiler, do not modify


#ifndef FLATBUFFERS_GENERATED_RESPONSE_FBS_RESPONSE_H_
#define FLATBUFFERS_GENERATED_RESPONSE_FBS_RESPONSE_H_

#include "flatbuffers/flatbuffers.h"

#include "rtpParameters_generated.h"
#include "worker_generated.h"
#include "transport_generated.h"
#include "consumer_generated.h"

namespace FBS {
namespace Response {

struct Response;
struct ResponseBuilder;

inline const flatbuffers::TypeTable *ResponseTypeTable();

enum class Body : uint8_t {
  NONE = 0,
  FBS_Worker_DumpResponse = 1,
  FBS_Worker_ResourceUsage = 2,
  FBS_Transport_ConsumeResponse = 3,
  MIN = NONE,
  MAX = FBS_Transport_ConsumeResponse
};

inline const Body (&EnumValuesBody())[4] {
  static const Body values[] = {
    Body::NONE,
    Body::FBS_Worker_DumpResponse,
    Body::FBS_Worker_ResourceUsage,
    Body::FBS_Transport_ConsumeResponse
  };
  return values;
}

inline const char * const *EnumNamesBody() {
  static const char * const names[5] = {
    "NONE",
    "FBS_Worker_DumpResponse",
    "FBS_Worker_ResourceUsage",
    "FBS_Transport_ConsumeResponse",
    nullptr
  };
  return names;
}

inline const char *EnumNameBody(Body e) {
  if (flatbuffers::IsOutRange(e, Body::NONE, Body::FBS_Transport_ConsumeResponse)) return "";
  const size_t index = static_cast<size_t>(e);
  return EnumNamesBody()[index];
}

template<typename T> struct BodyTraits {
  static const Body enum_value = Body::NONE;
};

template<> struct BodyTraits<FBS::Worker::DumpResponse> {
  static const Body enum_value = Body::FBS_Worker_DumpResponse;
};

template<> struct BodyTraits<FBS::Worker::ResourceUsage> {
  static const Body enum_value = Body::FBS_Worker_ResourceUsage;
};

template<> struct BodyTraits<FBS::Transport::ConsumeResponse> {
  static const Body enum_value = Body::FBS_Transport_ConsumeResponse;
};

bool VerifyBody(flatbuffers::Verifier &verifier, const void *obj, Body type);
bool VerifyBodyVector(flatbuffers::Verifier &verifier, const flatbuffers::Vector<flatbuffers::Offset<void>> *values, const flatbuffers::Vector<Body> *types);

struct Response FLATBUFFERS_FINAL_CLASS : private flatbuffers::Table {
  typedef ResponseBuilder Builder;
  static const flatbuffers::TypeTable *MiniReflectTypeTable() {
    return ResponseTypeTable();
  }
  enum FlatBuffersVTableOffset FLATBUFFERS_VTABLE_UNDERLYING_TYPE {
    VT_ID = 4,
    VT_ACCEPTED = 6,
    VT_BODY_TYPE = 8,
    VT_BODY = 10
  };
  uint32_t id() const {
    return GetField<uint32_t>(VT_ID, 0);
  }
  bool accepted() const {
    return GetField<uint8_t>(VT_ACCEPTED, 0) != 0;
  }
  FBS::Response::Body body_type() const {
    return static_cast<FBS::Response::Body>(GetField<uint8_t>(VT_BODY_TYPE, 0));
  }
  const void *body() const {
    return GetPointer<const void *>(VT_BODY);
  }
  template<typename T> const T *body_as() const;
  const FBS::Worker::DumpResponse *body_as_FBS_Worker_DumpResponse() const {
    return body_type() == FBS::Response::Body::FBS_Worker_DumpResponse ? static_cast<const FBS::Worker::DumpResponse *>(body()) : nullptr;
  }
  const FBS::Worker::ResourceUsage *body_as_FBS_Worker_ResourceUsage() const {
    return body_type() == FBS::Response::Body::FBS_Worker_ResourceUsage ? static_cast<const FBS::Worker::ResourceUsage *>(body()) : nullptr;
  }
  const FBS::Transport::ConsumeResponse *body_as_FBS_Transport_ConsumeResponse() const {
    return body_type() == FBS::Response::Body::FBS_Transport_ConsumeResponse ? static_cast<const FBS::Transport::ConsumeResponse *>(body()) : nullptr;
  }
  bool Verify(flatbuffers::Verifier &verifier) const {
    return VerifyTableStart(verifier) &&
           VerifyField<uint32_t>(verifier, VT_ID, 4) &&
           VerifyField<uint8_t>(verifier, VT_ACCEPTED, 1) &&
           VerifyField<uint8_t>(verifier, VT_BODY_TYPE, 1) &&
           VerifyOffset(verifier, VT_BODY) &&
           VerifyBody(verifier, body(), body_type()) &&
           verifier.EndTable();
  }
};

template<> inline const FBS::Worker::DumpResponse *Response::body_as<FBS::Worker::DumpResponse>() const {
  return body_as_FBS_Worker_DumpResponse();
}

template<> inline const FBS::Worker::ResourceUsage *Response::body_as<FBS::Worker::ResourceUsage>() const {
  return body_as_FBS_Worker_ResourceUsage();
}

template<> inline const FBS::Transport::ConsumeResponse *Response::body_as<FBS::Transport::ConsumeResponse>() const {
  return body_as_FBS_Transport_ConsumeResponse();
}

struct ResponseBuilder {
  typedef Response Table;
  flatbuffers::FlatBufferBuilder &fbb_;
  flatbuffers::uoffset_t start_;
  void add_id(uint32_t id) {
    fbb_.AddElement<uint32_t>(Response::VT_ID, id, 0);
  }
  void add_accepted(bool accepted) {
    fbb_.AddElement<uint8_t>(Response::VT_ACCEPTED, static_cast<uint8_t>(accepted), 0);
  }
  void add_body_type(FBS::Response::Body body_type) {
    fbb_.AddElement<uint8_t>(Response::VT_BODY_TYPE, static_cast<uint8_t>(body_type), 0);
  }
  void add_body(flatbuffers::Offset<void> body) {
    fbb_.AddOffset(Response::VT_BODY, body);
  }
  explicit ResponseBuilder(flatbuffers::FlatBufferBuilder &_fbb)
        : fbb_(_fbb) {
    start_ = fbb_.StartTable();
  }
  flatbuffers::Offset<Response> Finish() {
    const auto end = fbb_.EndTable(start_);
    auto o = flatbuffers::Offset<Response>(end);
    return o;
  }
};

inline flatbuffers::Offset<Response> CreateResponse(
    flatbuffers::FlatBufferBuilder &_fbb,
    uint32_t id = 0,
    bool accepted = false,
    FBS::Response::Body body_type = FBS::Response::Body::NONE,
    flatbuffers::Offset<void> body = 0) {
  ResponseBuilder builder_(_fbb);
  builder_.add_body(body);
  builder_.add_id(id);
  builder_.add_body_type(body_type);
  builder_.add_accepted(accepted);
  return builder_.Finish();
}

inline bool VerifyBody(flatbuffers::Verifier &verifier, const void *obj, Body type) {
  switch (type) {
    case Body::NONE: {
      return true;
    }
    case Body::FBS_Worker_DumpResponse: {
      auto ptr = reinterpret_cast<const FBS::Worker::DumpResponse *>(obj);
      return verifier.VerifyTable(ptr);
    }
    case Body::FBS_Worker_ResourceUsage: {
      auto ptr = reinterpret_cast<const FBS::Worker::ResourceUsage *>(obj);
      return verifier.VerifyTable(ptr);
    }
    case Body::FBS_Transport_ConsumeResponse: {
      auto ptr = reinterpret_cast<const FBS::Transport::ConsumeResponse *>(obj);
      return verifier.VerifyTable(ptr);
    }
    default: return true;
  }
}

inline bool VerifyBodyVector(flatbuffers::Verifier &verifier, const flatbuffers::Vector<flatbuffers::Offset<void>> *values, const flatbuffers::Vector<Body> *types) {
  if (!values || !types) return !values && !types;
  if (values->size() != types->size()) return false;
  for (flatbuffers::uoffset_t i = 0; i < values->size(); ++i) {
    if (!VerifyBody(
        verifier,  values->Get(i), types->GetEnum<Body>(i))) {
      return false;
    }
  }
  return true;
}

inline const flatbuffers::TypeTable *BodyTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_SEQUENCE, 0, -1 },
    { flatbuffers::ET_SEQUENCE, 0, 0 },
    { flatbuffers::ET_SEQUENCE, 0, 1 },
    { flatbuffers::ET_SEQUENCE, 0, 2 }
  };
  static const flatbuffers::TypeFunction type_refs[] = {
    FBS::Worker::DumpResponseTypeTable,
    FBS::Worker::ResourceUsageTypeTable,
    FBS::Transport::ConsumeResponseTypeTable
  };
  static const char * const names[] = {
    "NONE",
    "FBS_Worker_DumpResponse",
    "FBS_Worker_ResourceUsage",
    "FBS_Transport_ConsumeResponse"
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_UNION, 4, type_codes, type_refs, nullptr, nullptr, names
  };
  return &tt;
}

inline const flatbuffers::TypeTable *ResponseTypeTable() {
  static const flatbuffers::TypeCode type_codes[] = {
    { flatbuffers::ET_UINT, 0, -1 },
    { flatbuffers::ET_BOOL, 0, -1 },
    { flatbuffers::ET_UTYPE, 0, 0 },
    { flatbuffers::ET_SEQUENCE, 0, 0 }
  };
  static const flatbuffers::TypeFunction type_refs[] = {
    FBS::Response::BodyTypeTable
  };
  static const char * const names[] = {
    "id",
    "accepted",
    "body_type",
    "body"
  };
  static const flatbuffers::TypeTable tt = {
    flatbuffers::ST_TABLE, 4, type_codes, type_refs, nullptr, nullptr, names
  };
  return &tt;
}

inline const FBS::Response::Response *GetResponse(const void *buf) {
  return flatbuffers::GetRoot<FBS::Response::Response>(buf);
}

inline const FBS::Response::Response *GetSizePrefixedResponse(const void *buf) {
  return flatbuffers::GetSizePrefixedRoot<FBS::Response::Response>(buf);
}

inline bool VerifyResponseBuffer(
    flatbuffers::Verifier &verifier) {
  return verifier.VerifyBuffer<FBS::Response::Response>(nullptr);
}

inline bool VerifySizePrefixedResponseBuffer(
    flatbuffers::Verifier &verifier) {
  return verifier.VerifySizePrefixedBuffer<FBS::Response::Response>(nullptr);
}

inline void FinishResponseBuffer(
    flatbuffers::FlatBufferBuilder &fbb,
    flatbuffers::Offset<FBS::Response::Response> root) {
  fbb.Finish(root);
}

inline void FinishSizePrefixedResponseBuffer(
    flatbuffers::FlatBufferBuilder &fbb,
    flatbuffers::Offset<FBS::Response::Response> root) {
  fbb.FinishSizePrefixed(root);
}

}  // namespace Response
}  // namespace FBS

#endif  // FLATBUFFERS_GENERATED_RESPONSE_FBS_RESPONSE_H_
