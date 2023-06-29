/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface HttpExceptionMessage {
  message: string;
  code: string;
}

export interface HttpException {
  statusCode: number;
  message: HttpExceptionMessage[];
  error: string;
}

function createBaseHttpExceptionMessage(): HttpExceptionMessage {
  return { message: "", code: "" };
}

export const HttpExceptionMessage = {
  encode(message: HttpExceptionMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.message !== "") {
      writer.uint32(10).string(message.message);
    }
    if (message.code !== "") {
      writer.uint32(18).string(message.code);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HttpExceptionMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHttpExceptionMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.message = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.code = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): HttpExceptionMessage {
    return {
      message: isSet(object.message) ? String(object.message) : "",
      code: isSet(object.code) ? String(object.code) : "",
    };
  },

  toJSON(message: HttpExceptionMessage): unknown {
    const obj: any = {};
    message.message !== undefined && (obj.message = message.message);
    message.code !== undefined && (obj.code = message.code);
    return obj;
  },

  create<I extends Exact<DeepPartial<HttpExceptionMessage>, I>>(base?: I): HttpExceptionMessage {
    return HttpExceptionMessage.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<HttpExceptionMessage>, I>>(object: I): HttpExceptionMessage {
    const message = createBaseHttpExceptionMessage();
    message.message = object.message ?? "";
    message.code = object.code ?? "";
    return message;
  },
};

function createBaseHttpException(): HttpException {
  return { statusCode: 0, message: [], error: "" };
}

export const HttpException = {
  encode(message: HttpException, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.statusCode !== 0) {
      writer.uint32(8).int32(message.statusCode);
    }
    for (const v of message.message) {
      HttpExceptionMessage.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.error !== "") {
      writer.uint32(26).string(message.error);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): HttpException {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHttpException();
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

          message.message.push(HttpExceptionMessage.decode(reader, reader.uint32()));
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

  fromJSON(object: any): HttpException {
    return {
      statusCode: isSet(object.statusCode) ? Number(object.statusCode) : 0,
      message: Array.isArray(object?.message) ? object.message.map((e: any) => HttpExceptionMessage.fromJSON(e)) : [],
      error: isSet(object.error) ? String(object.error) : "",
    };
  },

  toJSON(message: HttpException): unknown {
    const obj: any = {};
    message.statusCode !== undefined && (obj.statusCode = Math.round(message.statusCode));
    if (message.message) {
      obj.message = message.message.map((e) => e ? HttpExceptionMessage.toJSON(e) : undefined);
    } else {
      obj.message = [];
    }
    message.error !== undefined && (obj.error = message.error);
    return obj;
  },

  create<I extends Exact<DeepPartial<HttpException>, I>>(base?: I): HttpException {
    return HttpException.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<HttpException>, I>>(object: I): HttpException {
    const message = createBaseHttpException();
    message.statusCode = object.statusCode ?? 0;
    message.message = object.message?.map((e) => HttpExceptionMessage.fromPartial(e)) || [];
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
