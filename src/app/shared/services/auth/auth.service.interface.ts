import {
  V1GetUsersHttpQuery,
  V1GetUsersHttpResponse,
  V1LogInHttpRequest,
  V1LogInHttpResponse,
  V1UserModel,
} from '@api/http';

export type LogInRequestDto = V1LogInHttpRequest;
export type LogInResponseDto = V1LogInHttpResponse;
export type UserModel = V1UserModel;
export type GetUsersHttpQuery = V1GetUsersHttpQuery;
export type GetUsersHttpResponse = V1GetUsersHttpResponse;
