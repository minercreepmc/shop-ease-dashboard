/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface V1RemoveProductsHttpRequest {
  ids: string[];
}

export interface V1RemoveProductsHttpResponse {
  ids: string[];
  message: string;
}

function createBaseV1RemoveProductsHttpRequest(): V1RemoveProductsHttpRequest {
  return { ids: [] };
}

export const V1RemoveProductsHttpRequest = {
  encode(message: V1RemoveProductsHttpRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): V1RemoveProductsHttpRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseV1RemoveProductsHttpRequest();
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

  fromJSON(object: any): V1RemoveProductsHttpRequest {
    return { ids: Array.isArray(object?.ids) ? object.ids.map((e: any) => String(e)) : [] };
  },

  toJSON(message: V1RemoveProductsHttpRequest): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<V1RemoveProductsHttpRequest>, I>>(base?: I): V1RemoveProductsHttpRequest {
    return V1RemoveProductsHttpRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<V1RemoveProductsHttpRequest>, I>>(object: I): V1RemoveProductsHttpRequest {
    const message = createBaseV1RemoveProductsHttpRequest();
    message.ids = object.ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseV1RemoveProductsHttpResponse(): V1RemoveProductsHttpResponse {
  return { ids: [], message: "" };
}

export const V1RemoveProductsHttpResponse = {
  encode(message: V1RemoveProductsHttpResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): V1RemoveProductsHttpResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseV1RemoveProductsHttpResponse();
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

  fromJSON(object: any): V1RemoveProductsHttpResponse {
    return {
      ids: Array.isArray(object?.ids) ? object.ids.map((e: any) => String(e)) : [],
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: V1RemoveProductsHttpResponse): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  create<I extends Exact<DeepPartial<V1RemoveProductsHttpResponse>, I>>(base?: I): V1RemoveProductsHttpResponse {
    return V1RemoveProductsHttpResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<V1RemoveProductsHttpResponse>, I>>(object: I): V1RemoveProductsHttpResponse {
    const message = createBaseV1RemoveProductsHttpResponse();
    message.ids = object.ids?.map((e) => e) || [];
    message.message = object.message ?? "";
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
