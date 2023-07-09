/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface V1CreateCategoryHttpRequest {
  name: string;
  description?: string | undefined;
}

export interface V1CreateCategoryHttpResponse {
  id: string;
  name: string;
  description?: string | undefined;
  message?: string | undefined;
}

function createBaseV1CreateCategoryHttpRequest(): V1CreateCategoryHttpRequest {
  return { name: "", description: undefined };
}

export const V1CreateCategoryHttpRequest = {
  encode(message: V1CreateCategoryHttpRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== undefined) {
      writer.uint32(18).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): V1CreateCategoryHttpRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseV1CreateCategoryHttpRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): V1CreateCategoryHttpRequest {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : undefined,
    };
  },

  toJSON(message: V1CreateCategoryHttpRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  create<I extends Exact<DeepPartial<V1CreateCategoryHttpRequest>, I>>(base?: I): V1CreateCategoryHttpRequest {
    return V1CreateCategoryHttpRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<V1CreateCategoryHttpRequest>, I>>(object: I): V1CreateCategoryHttpRequest {
    const message = createBaseV1CreateCategoryHttpRequest();
    message.name = object.name ?? "";
    message.description = object.description ?? undefined;
    return message;
  },
};

function createBaseV1CreateCategoryHttpResponse(): V1CreateCategoryHttpResponse {
  return { id: "", name: "", description: undefined, message: undefined };
}

export const V1CreateCategoryHttpResponse = {
  encode(message: V1CreateCategoryHttpResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== undefined) {
      writer.uint32(26).string(message.description);
    }
    if (message.message !== undefined) {
      writer.uint32(34).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): V1CreateCategoryHttpResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseV1CreateCategoryHttpResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): V1CreateCategoryHttpResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : undefined,
      message: isSet(object.message) ? String(object.message) : undefined,
    };
  },

  toJSON(message: V1CreateCategoryHttpResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  create<I extends Exact<DeepPartial<V1CreateCategoryHttpResponse>, I>>(base?: I): V1CreateCategoryHttpResponse {
    return V1CreateCategoryHttpResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<V1CreateCategoryHttpResponse>, I>>(object: I): V1CreateCategoryHttpResponse {
    const message = createBaseV1CreateCategoryHttpResponse();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? undefined;
    message.message = object.message ?? undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
