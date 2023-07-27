import { HttpErrorResponse } from '@angular/common/http';

export interface HttpExceptionMessage {
  message: string;
  code: number;
}

export class HttpCustomException {
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
