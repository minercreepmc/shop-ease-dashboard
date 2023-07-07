/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface Price {
  amount: number;
  currency: string;
}

export interface V1GetProductsHttpRequest {
  fields: string[];
  offset?: number | undefined;
  limit?: number | undefined;
}

export interface ProductResponse {
  id: string;
  name: string;
  price: Price | undefined;
  imageurl?: string | undefined;
  description?: string | undefined;
  message?: string | undefined;
}

export interface V1GetProductsHttpResponse {
  products: ProductResponse[];
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

function createBaseV1GetProductsHttpRequest(): V1GetProductsHttpRequest {
  return { fields: [], offset: undefined, limit: undefined };
}

export const V1GetProductsHttpRequest = {
  encode(message: V1GetProductsHttpRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.fields) {
      writer.uint32(10).string(v!);
    }
    if (message.offset !== undefined) {
      writer.uint32(16).int32(message.offset);
    }
    if (message.limit !== undefined) {
      writer.uint32(24).int32(message.limit);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): V1GetProductsHttpRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseV1GetProductsHttpRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.fields.push(reader.string());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.offset = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.limit = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): V1GetProductsHttpRequest {
    return {
      fields: Array.isArray(object?.fields) ? object.fields.map((e: any) => String(e)) : [],
      offset: isSet(object.offset) ? Number(object.offset) : undefined,
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
    };
  },

  toJSON(message: V1GetProductsHttpRequest): unknown {
    const obj: any = {};
    if (message.fields) {
      obj.fields = message.fields.map((e) => e);
    } else {
      obj.fields = [];
    }
    message.offset !== undefined && (obj.offset = Math.round(message.offset));
    message.limit !== undefined && (obj.limit = Math.round(message.limit));
    return obj;
  },

  create<I extends Exact<DeepPartial<V1GetProductsHttpRequest>, I>>(base?: I): V1GetProductsHttpRequest {
    return V1GetProductsHttpRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<V1GetProductsHttpRequest>, I>>(object: I): V1GetProductsHttpRequest {
    const message = createBaseV1GetProductsHttpRequest();
    message.fields = object.fields?.map((e) => e) || [];
    message.offset = object.offset ?? undefined;
    message.limit = object.limit ?? undefined;
    return message;
  },
};

function createBaseProductResponse(): ProductResponse {
  return { id: "", name: "", price: undefined, imageurl: undefined, description: undefined, message: undefined };
}

export const ProductResponse = {
  encode(message: ProductResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.price !== undefined) {
      Price.encode(message.price, writer.uint32(26).fork()).ldelim();
    }
    if (message.imageurl !== undefined) {
      writer.uint32(34).string(message.imageurl);
    }
    if (message.description !== undefined) {
      writer.uint32(42).string(message.description);
    }
    if (message.message !== undefined) {
      writer.uint32(50).string(message.message);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ProductResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProductResponse();
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

          message.price = Price.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.imageurl = reader.string();
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

  fromJSON(object: any): ProductResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      price: isSet(object.price) ? Price.fromJSON(object.price) : undefined,
      imageurl: isSet(object.imageurl) ? String(object.imageurl) : undefined,
      description: isSet(object.description) ? String(object.description) : undefined,
      message: isSet(object.message) ? String(object.message) : undefined,
    };
  },

  toJSON(message: ProductResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.price !== undefined && (obj.price = message.price ? Price.toJSON(message.price) : undefined);
    message.imageurl !== undefined && (obj.imageurl = message.imageurl);
    message.description !== undefined && (obj.description = message.description);
    message.message !== undefined && (obj.message = message.message);
    return obj;
  },

  create<I extends Exact<DeepPartial<ProductResponse>, I>>(base?: I): ProductResponse {
    return ProductResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ProductResponse>, I>>(object: I): ProductResponse {
    const message = createBaseProductResponse();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.price = (object.price !== undefined && object.price !== null) ? Price.fromPartial(object.price) : undefined;
    message.imageurl = object.imageurl ?? undefined;
    message.description = object.description ?? undefined;
    message.message = object.message ?? undefined;
    return message;
  },
};

function createBaseV1GetProductsHttpResponse(): V1GetProductsHttpResponse {
  return { products: [] };
}

export const V1GetProductsHttpResponse = {
  encode(message: V1GetProductsHttpResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.products) {
      ProductResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): V1GetProductsHttpResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseV1GetProductsHttpResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.products.push(ProductResponse.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): V1GetProductsHttpResponse {
    return {
      products: Array.isArray(object?.products) ? object.products.map((e: any) => ProductResponse.fromJSON(e)) : [],
    };
  },

  toJSON(message: V1GetProductsHttpResponse): unknown {
    const obj: any = {};
    if (message.products) {
      obj.products = message.products.map((e) => e ? ProductResponse.toJSON(e) : undefined);
    } else {
      obj.products = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<V1GetProductsHttpResponse>, I>>(base?: I): V1GetProductsHttpResponse {
    return V1GetProductsHttpResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<V1GetProductsHttpResponse>, I>>(object: I): V1GetProductsHttpResponse {
    const message = createBaseV1GetProductsHttpResponse();
    message.products = object.products?.map((e) => ProductResponse.fromPartial(e)) || [];
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
