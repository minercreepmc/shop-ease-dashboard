/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export enum CurrencyEnum {
  USD = 0,
  UNRECOGNIZED = -1,
}

export function currencyEnumFromJSON(object: any): CurrencyEnum {
  switch (object) {
    case 0:
    case "USD":
      return CurrencyEnum.USD;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CurrencyEnum.UNRECOGNIZED;
  }
}

export function currencyEnumToJSON(object: CurrencyEnum): string {
  switch (object) {
    case CurrencyEnum.USD:
      return "USD";
    case CurrencyEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface Price {
  amount: number;
  currency: string;
}

export interface V1CreateProductHttpRequest {
  name: string;
  price: Price | undefined;
  image: Uint8Array;
  description?: string | undefined;
}

export interface V1CreateProductHttpResponse {
  productId: string;
  name: string;
  price: Price | undefined;
  imageUrl: string;
  description?: string | undefined;
  message: string;
}

function createBasePrice(): Price {
  return { amount: 0, currency: "" };
}

export const Price = {
  encode(message: Price, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.amount !== 0) {
      writer.uint32(13).float(message.amount);
    }
    if (message.currency !== "") {
      writer.uint32(18).string(message.currency);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Price {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePrice();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 13) {
            break;
          }

          message.amount = reader.float();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.currency = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Price {
    return {
      amount: isSet(object.amount) ? Number(object.amount) : 0,
      currency: isSet(object.currency) ? String(object.currency) : "",
    };
  },

  toJSON(message: Price): unknown {
    const obj: any = {};
    message.amount !== undefined && (obj.amount = message.amount);
    message.currency !== undefined && (obj.currency = message.currency);
    return obj;
  },

  create<I extends Exact<DeepPartial<Price>, I>>(base?: I): Price {
    return Price.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Price>, I>>(object: I): Price {
    const message = createBasePrice();
    message.amount = object.amount ?? 0;
    message.currency = object.currency ?? "";
    return message;
  },
};

function createBaseV1CreateProductHttpRequest(): V1CreateProductHttpRequest {
  return { name: "", price: undefined, image: new Uint8Array(0), description: undefined };
}

export const V1CreateProductHttpRequest = {
  encode(message: V1CreateProductHttpRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.price !== undefined) {
      Price.encode(message.price, writer.uint32(18).fork()).ldelim();
    }
    if (message.image.length !== 0) {
      writer.uint32(26).bytes(message.image);
    }
    if (message.description !== undefined) {
      writer.uint32(34).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): V1CreateProductHttpRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseV1CreateProductHttpRequest();
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

          message.price = Price.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.image = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
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

  fromJSON(object: any): V1CreateProductHttpRequest {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      price: isSet(object.price) ? Price.fromJSON(object.price) : undefined,
      image: isSet(object.image) ? bytesFromBase64(object.image) : new Uint8Array(0),
      description: isSet(object.description) ? String(object.description) : undefined,
    };
  },

  toJSON(message: V1CreateProductHttpRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.price !== undefined && (obj.price = message.price ? Price.toJSON(message.price) : undefined);
    message.image !== undefined &&
      (obj.image = base64FromBytes(message.image !== undefined ? message.image : new Uint8Array(0)));
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  create<I extends Exact<DeepPartial<V1CreateProductHttpRequest>, I>>(base?: I): V1CreateProductHttpRequest {
    return V1CreateProductHttpRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<V1CreateProductHttpRequest>, I>>(object: I): V1CreateProductHttpRequest {
    const message = createBaseV1CreateProductHttpRequest();
    message.name = object.name ?? "";
    message.price = (object.price !== undefined && object.price !== null) ? Price.fromPartial(object.price) : undefined;
    message.image = object.image ?? new Uint8Array(0);
    message.description = object.description ?? undefined;
    return message;
  },
};

function createBaseV1CreateProductHttpResponse(): V1CreateProductHttpResponse {
  return { productId: "", name: "", price: undefined, imageUrl: "", description: undefined, message: "" };
}

export const V1CreateProductHttpResponse = {
  encode(message: V1CreateProductHttpResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.productId !== "") {
      writer.uint32(10).string(message.productId);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.price !== undefined) {
      Price.encode(message.price, writer.uint32(26).fork()).ldelim();
    }
    if (message.imageUrl !== "") {
      writer.uint32(34).string(message.imageUrl);
    }
    if (message.description !== undefined) {
      writer.uint32(42).string(message.description);
    }
    if (message.message !== "") {
      writer.uint32(50).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): V1CreateProductHttpResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseV1CreateProductHttpResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.productId = reader.string();
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

          message.price = Price.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.imageUrl = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.description = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
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

  fromJSON(object: any): V1CreateProductHttpResponse {
    return {
      productId: isSet(object.productId) ? String(object.productId) : "",
      name: isSet(object.name) ? String(object.name) : "",
      price: isSet(object.price) ? Price.fromJSON(object.price) : undefined,
      imageUrl: isSet(object.imageUrl) ? String(object.imageUrl) : "",
      description: isSet(object.description) ? String(object.description) : undefined,
      message: isSet(object.message) ? String(object.message) : "",
    };
  },

  toJSON(message: V1CreateProductHttpResponse): unknown {
    const obj: any = {};
    message.productId !== undefined && (obj.productId = message.productId);
    message.name !== undefined && (obj.name = message.name);
    message.price !== undefined && (obj.price = message.price ? Price.toJSON(message.price) : undefined);
    message.imageUrl !== undefined && (obj.imageUrl = message.imageUrl);
    message.description !== undefined && (obj.description = message.description);
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  create<I extends Exact<DeepPartial<V1CreateProductHttpResponse>, I>>(base?: I): V1CreateProductHttpResponse {
    return V1CreateProductHttpResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<V1CreateProductHttpResponse>, I>>(object: I): V1CreateProductHttpResponse {
    const message = createBaseV1CreateProductHttpResponse();
    message.productId = object.productId ?? "";
    message.name = object.name ?? "";
    message.price = (object.price !== undefined && object.price !== null) ? Price.fromPartial(object.price) : undefined;
    message.imageUrl = object.imageUrl ?? "";
    message.description = object.description ?? undefined;
    message.message = object.message ?? "";
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

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
