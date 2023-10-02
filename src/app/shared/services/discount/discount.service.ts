import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCustomException } from '@api/http';
import { ApiApplication } from '@shared/constants/api.constant';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import {
  CreateDiscountRequest,
  CreateDiscountResponse,
  DiscountModel,
  UpdateDiscountHttpResponse,
  UpdateDiscountRequest,
} from './discount.service.dto';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  constructor(private readonly http: HttpClient) {}
  private discounts = new BehaviorSubject<DiscountModel[]>([]);
  get discounts$() {
    return this.discounts;
  }

  createDiscount$(dto: CreateDiscountRequest) {
    return this.http
      .post<CreateDiscountResponse>(ApiApplication.DISCOUNT.CREATE, dto)
      .pipe(
        tap((response: CreateDiscountResponse) => {
          const newDiscount = response;
          this.discounts.next([...this.discounts.value, newDiscount]);
        }),
        catchError(this.handleError),
      );
  }

  updateDiscount$(id: string, dto: UpdateDiscountRequest) {
    return this.http
      .put<UpdateDiscountHttpResponse>(
        ApiApplication.DISCOUNT.UPDATE.replace(':id', id),
        dto,
      )
      .pipe(
        tap((response: UpdateDiscountHttpResponse) => {
          const updateDiscount: DiscountModel = {
            ...response,
          };
          this.discounts.next(
            this.discounts.value.map((category) => {
              if (category.id === updateDiscount.id) {
                return updateDiscount;
              }
              return category;
            }),
          );
        }),
        catchError(this.handleError),
      );
  }

  getDiscounts$() {
    return this.http
      .get<DiscountModel[]>(ApiApplication.DISCOUNT.GET_ALL)
      .pipe(catchError(this.handleError));
  }

  getDiscount$(id: string) {
    return this.http
      .get<DiscountModel>(ApiApplication.DISCOUNT.GET_ONE.replace(':id', id))
      .pipe(catchError(this.handleError));
  }

  removeDiscount$(id: string) {
    return this.http
      .delete<void>(ApiApplication.DISCOUNT.DELETE.replace(':id', id))
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new HttpCustomException(error));
  }
}
