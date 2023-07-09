/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface CategoryResponse {
  id: string;
  name: string;
  description?: string | undefined;
}

export interface V1GetCategoriesHttpRequest {
  fields: string[];
  offset?: number | undefined;
  limit?: number | undefined;
}

export interface V1GetCategoriesHttpResponse {
  categories: CategoryResponse[];
}

function createBaseCategoryResponse(): CategoryResponse {
  return { id: "", name: "", description: undefined };
}

export const CategoryResponse = {
  encode(message: CategoryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== undefined) {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CategoryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCategoryResponse();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CategoryResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : undefined,
    };
  },

  toJSON(message: CategoryResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  create<I extends Exact<DeepPartial<CategoryResponse>, I>>(base?: I): CategoryResponse {
    return CategoryResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CategoryResponse>, I>>(object: I): CategoryResponse {
    const message = createBaseCategoryResponse();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? undefined;
    return message;
  },
};

function createBaseV1GetCategoriesHttpRequest(): V1GetCategoriesHttpRequest {
  return { fields: [], offset: undefined, limit: undefined };
}

export const V1GetCategoriesHttpRequest = {
  encode(message: V1GetCategoriesHttpRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): V1GetCategoriesHttpRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseV1GetCategoriesHttpRequest();
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

  fromJSON(object: any): V1GetCategoriesHttpRequest {
    return {
      fields: Array.isArray(object?.fields) ? object.fields.map((e: any) => String(e)) : [],
      offset: isSet(object.offset) ? Number(object.offset) : undefined,
      limit: isSet(object.limit) ? Number(object.limit) : undefined,
    };
  },

  toJSON(message: V1GetCategoriesHttpRequest): unknown {
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

  create<I extends Exact<DeepPartial<V1GetCategoriesHttpRequest>, I>>(base?: I): V1GetCategoriesHttpRequest {
    return V1GetCategoriesHttpRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<V1GetCategoriesHttpRequest>, I>>(object: I): V1GetCategoriesHttpRequest {
    const message = createBaseV1GetCategoriesHttpRequest();
    message.fields = object.fields?.map((e) => e) || [];
    message.offset = object.offset ?? undefined;
    message.limit = object.limit ?? undefined;
    return message;
  },
};

function createBaseV1GetCategoriesHttpResponse(): V1GetCategoriesHttpResponse {
  return { categories: [] };
}

export const V1GetCategoriesHttpResponse = {
  encode(message: V1GetCategoriesHttpResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.categories) {
      CategoryResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): V1GetCategoriesHttpResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseV1GetCategoriesHttpResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.categories.push(CategoryResponse.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): V1GetCategoriesHttpResponse {
    return {
      categories: Array.isArray(object?.categories)
        ? object.categories.map((e: any) => CategoryResponse.fromJSON(e))
        : [],
    };
  },

  toJSON(message: V1GetCategoriesHttpResponse): unknown {
    const obj: any = {};
    if (message.categories) {
      obj.categories = message.categories.map((e) => e ? CategoryResponse.toJSON(e) : undefined);
    } else {
      obj.categories = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<V1GetCategoriesHttpResponse>, I>>(base?: I): V1GetCategoriesHttpResponse {
    return V1GetCategoriesHttpResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<V1GetCategoriesHttpResponse>, I>>(object: I): V1GetCategoriesHttpResponse {
    const message = createBaseV1GetCategoriesHttpResponse();
    message.categories = object.categories?.map((e) => CategoryResponse.fromPartial(e)) || [];
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
