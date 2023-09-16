import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class CleanPayloadInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    if (request.body) {
      const cleanBody = this.cleanObject(request.body);
      const clonedRequest = request.clone({ body: cleanBody });
      return next.handle(clonedRequest);
    }

    return next.handle(request);
  }

  cleanObject(obj: any): any {
    if (obj instanceof FormData) {
      // If it's FormData, clean its entries
      const cleanedFormData = new FormData();
      obj.forEach((value: any, key: string) => {
        // Exclude null, empty string, or "null" string values
        if (
          value != null &&
          value !== '' &&
          value !== 'null' &&
          value !== 'undefined'
        ) {
          cleanedFormData.append(key, value);
        }
      });
      return cleanedFormData;
    } else if (Array.isArray(obj)) {
      // If it's an array, filter out null or empty string values
      return obj
        .filter(
          (value) =>
            value != null &&
            value !== '' &&
            value !== 'null' &&
            value !== 'undefined',
        )
        .map((value) =>
          typeof value === 'object' ? this.cleanObject(value) : value,
        );
    } else {
      // If it's an object, recurse for each property
      const cleanedObj: any = {};
      for (const key in obj) {
        if (obj[key] != null && obj[key] !== '' && obj[key] !== 'null' && obj[key] !== 'undefined') {
          cleanedObj[key] =
            typeof obj[key] === 'object'
              ? this.cleanObject(obj[key])
              : obj[key];
        }
      }
      return cleanedObj;
    }
  }
}
