import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpCustomException } from '@shared/dtos';
import { toastDiToken, ToastPort } from '@shared/interfaces';

@Injectable()
export class HttpCustomExceptionHandler implements ErrorHandler {
  constructor(private readonly injector: Injector) {}

  handleError(exceptions: any): void {
    const toaster = this.injector.get<ToastPort>(toastDiToken);

    if (HttpCustomException.isHttpException(exceptions)) {
      const customExceptions = exceptions as HttpCustomException;
      customExceptions.message.forEach((m) => {
        console.log(m.message);
        toaster.error(m.message);
      });
    }
  }
}
