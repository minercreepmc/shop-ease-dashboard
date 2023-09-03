import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpCustomException } from '@shared/dtos';
import { ToastrCustomService } from '@shared/libraries/toastr';

@Injectable()
export class HttpCustomExceptionHandler implements ErrorHandler {
  constructor(private readonly injector: Injector) {}

  handleError(exceptions: any): void {
    const toast = this.injector.get<ToastrCustomService>(ToastrCustomService);

    if (HttpCustomException.isHttpException(exceptions)) {
      const customExceptions = exceptions as HttpCustomException;
      if (Array.isArray(customExceptions.message)) {
        customExceptions.message.forEach?.((m) => {
          toast.error(m.message);
        });
      } else {
        toast.error(customExceptions.message);
      }
    }
  }
}
