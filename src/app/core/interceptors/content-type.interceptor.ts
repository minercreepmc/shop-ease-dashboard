/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class ContentTypeInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!(req.body instanceof FormData)) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        },
      });
    }

    return next.handle(req);
  }
}
