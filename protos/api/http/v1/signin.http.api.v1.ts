/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Struct } from "../../../../google/protobuf/struct";

export const protobufPackage = "";

export interface V1SignInHttpRequest {
  email?: string | undefined;
  password: string;
  username?: string | undefined;
}

export interface V1SignInHttpResponse {
  accessToken: string;
  message: string;
}

export interface V1SignInExceptions {
  statusCode: number;
  message: { [key: string]: any }[];
  error: string;
}

function createBaseV1SignInHttpRequest(): V1SignInHttpRequest {
  return { email: undefined, password: "", username: undefined };
}

export const V1SignInHttpRequest = {
  encode(message: V1SignInHttpRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== undefined) {
      writer.uint32(10).string(message.email);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    if (message.username !== undefined) {
      writer.uint32(26).string(message.username);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): V1SignInHttpRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseV1SignInHttpRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.password = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.username = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): V1SignInHttpRequest {
    return {
      email: isSet(object.email) ? String(object.email) : undefined,
      password: isSet(object.password) ? String(object.password) : "",
      username: isSet(object.username) ? String(object.username) : undefined,
    };
  },

  toJSON(message: V1SignInHttpRequest): unknown {
    const obj: any = {};
    message.email !== undefined && (obj.email = message.email);
    message.password !== undefined && (obj.password = message.password);
    message.username !== undefined && (obj.username = message.username);
    return obj;
  },

  create<I extends Exact<DeepPartial<V1SignInHttpRequest>, I>>(base?: I): V1SignInHttpRequest {
    return V1SignInHttpRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<V1SignInHttpRequest>, I>>(object: I): V1SignInHttpRequest {
    const message = createBaseV1SignInHttpRequest();
    message.email = object.email ?? undefined;
    message.password = object.password ?? "";
    message.username = object.username ?? undefined;
    return message;
  },
};

function createBaseV1SignInHttpResponse(): V1SignInHttpResponse {
  return { accessToken: "", message: "" };
}

export const V1SignInHttpResponse = {
  encode(message: V1SignInHttpResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.accessToken !== "") {
      writer.uint32(10).string(message.accessToken);
    }
    if (message.message !== "") {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): V1SignInHttpResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseV1SignInHttpResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.accessToken = reader.string();
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

  fromJSON(object: any): V1SignInHttpResponse {
    return {
      accessToken: isSet(object.accessToken) ? String(object.accessToken) : "",
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: V1SignInHttpResponse): unknown {
    const obj: any = {};
    message.accessToken !== undefined && (obj.accessToken = message.accessToken);
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  create<I extends Exact<DeepPartial<V1SignInHttpResponse>, I>>(base?: I): V1SignInHttpResponse {
    return V1SignInHttpResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<V1SignInHttpResponse>, I>>(object: I): V1SignInHttpResponse {
    const message = createBaseV1SignInHttpResponse();
    message.accessToken = object.accessToken ?? "";
    message.message = object.message ?? "";
    return message;
  },
};

function createBaseV1SignInExceptions(): V1SignInExceptions {
  return { statusCode: 0, message: [], error: "" };
}

export const V1SignInExceptions = {
  encode(message: V1SignInExceptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.statusCode !== 0) {
      writer.uint32(8).int32(message.statusCode);
    }
    for (const v of message.message) {
      Struct.encode(Struct.wrap(v!), writer.uint32(18).fork()).ldelim();
    }
    if (message.error !== "") {
      writer.uint32(26).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): V1SignInExceptions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseV1SignInExceptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.statusCode = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message.push(Struct.unwrap(Struct.decode(reader, reader.uint32())));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.error = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): V1SignInExceptions {
    return {
      statusCode: isSet(object.statusCode) ? Number(object.statusCode) : 0,
      message: Array.isArray(object?.message) ? [...object.message] : [],
      error: isSet(object.error) ? String(object.error) : "",
    };
  },

  toJSON(message: V1SignInExceptions): unknown {
    const obj: any = {};
    message.statusCode !== undefined && (obj.statusCode = Math.round(message.statusCode));
    if (message.message) {
      obj.message = message.message.map((e) => e);
    } else {
      obj.message = [];
    }
    message.error !== undefined && (obj.error = message.error);
    return obj;
  },

  create<I extends Exact<DeepPartial<V1SignInExceptions>, I>>(base?: I): V1SignInExceptions {
    return V1SignInExceptions.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<V1SignInExceptions>, I>>(object: I): V1SignInExceptions {
    const message = createBaseV1SignInExceptions();
    message.statusCode = object.statusCode ?? 0;
    message.message = object.message?.map((e) => e) || [];
    message.error = object.error ?? "";
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
