import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpException,
  HttpExceptionMessage,
} from '@protos/api/http/http.exception';

export class HttpCustomException implements HttpException {
  statusCode: number;
  message: HttpExceptionMessage[];
  error: string;

  constructor(options: HttpErrorResponse) {
    this.statusCode = options?.error.statusCode;
    this.message = options?.error.message;
    this.error = options?.error.error;
  }

  static isHttpException(exceptions: any): exceptions is HttpCustomException {
    console.log(exceptions);
    if (
      'statusCode' in exceptions &&
      'message' in exceptions &&
      'error' in exceptions
    ) {
      return true;
    }
    return false;
  }
}
