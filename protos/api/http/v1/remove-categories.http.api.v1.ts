/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface V1RemoveCategoriesHttpRequest {
  ids: string[];
}

export interface V1RemoveCategoriesHttpResponse {
  ids: string[];
  message?: string | undefined;
}

function createBaseV1RemoveCategoriesHttpRequest(): V1RemoveCategoriesHttpRequest {
  return { ids: [] };
}

export const V1RemoveCategoriesHttpRequest = {
  encode(message: V1RemoveCategoriesHttpRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): V1RemoveCategoriesHttpRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseV1RemoveCategoriesHttpRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ids.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): V1RemoveCategoriesHttpRequest {
    return { ids: Array.isArray(object?.ids) ? object.ids.map((e: any) => String(e)) : [] };
  },

  toJSON(message: V1RemoveCategoriesHttpRequest): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<V1RemoveCategoriesHttpRequest>, I>>(base?: I): V1RemoveCategoriesHttpRequest {
    return V1RemoveCategoriesHttpRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<V1RemoveCategoriesHttpRequest>, I>>(
    object: I,
  ): V1RemoveCategoriesHttpRequest {
    const message = createBaseV1RemoveCategoriesHttpRequest();
    message.ids = object.ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseV1RemoveCategoriesHttpResponse(): V1RemoveCategoriesHttpResponse {
  return { ids: [], message: undefined };
}

export const V1RemoveCategoriesHttpResponse = {
  encode(message: V1RemoveCategoriesHttpResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): V1RemoveCategoriesHttpResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseV1RemoveCategoriesHttpResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ids.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
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

  fromJSON(object: any): V1RemoveCategoriesHttpResponse {
    return {
      ids: Array.isArray(object?.ids) ? object.ids.map((e: any) => String(e)) : [],
      message: isSet(object.message) ? String(object.message) : undefined,
    };
  },

  toJSON(message: V1RemoveCategoriesHttpResponse): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  create<I extends Exact<DeepPartial<V1RemoveCategoriesHttpResponse>, I>>(base?: I): V1RemoveCategoriesHttpResponse {
    return V1RemoveCategoriesHttpResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<V1RemoveCategoriesHttpResponse>, I>>(
    object: I,
  ): V1RemoveCategoriesHttpResponse {
    const message = createBaseV1RemoveCategoriesHttpResponse();
    message.ids = object.ids?.map((e) => e) || [];
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
