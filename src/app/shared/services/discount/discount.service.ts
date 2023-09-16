import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCustomException, v1ApiEndpoints } from '@api/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import {
  CreateDiscountHttpRequest,
  CreateDiscountHttpResponse,
  DiscountModel,
  GetDiscountHttpQuery,
  GetDiscountHttpResponse,
  GetDiscountsHttpQuery,
  GetDiscountsHttpResponse,
  UpdateDiscountHttpRequest,
  UpdateDiscountHttpResponse,
} from './discount.service.dto';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  constructor(private readonly http: HttpClient) {}
  private readonly createDiscountUrl = v1ApiEndpoints.createDiscount;
  private readonly updateDiscountUrl = v1ApiEndpoints.updateDiscount;
  private readonly getDiscountsUrl = v1ApiEndpoints.getDiscounts;
  private readonly getDiscountUrl = v1ApiEndpoints.getDiscount;
  private readonly removeDiscountUrl = v1ApiEndpoints.removeDiscount;

  private discounts = new BehaviorSubject<DiscountModel[]>([]);
  get discounts$(): Observable<DiscountModel[]> {
    return this.discounts.asObservable();
  }

  createDiscount$(dto: CreateDiscountHttpRequest) {
    return this.http
      .post<CreateDiscountHttpResponse>(this.createDiscountUrl, dto)
      .pipe(
        tap((response: CreateDiscountHttpResponse) => {
          const newDiscount = response;
          this.discounts.next([...this.discounts.value]);
        }),
        catchError(this.handleError),
      );
  }

  updateDiscount$(id: string, dto: UpdateDiscountHttpRequest) {
    const url = this.updateDiscountUrl.replace(':id', id);
    return this.http.put<UpdateDiscountHttpResponse>(url, dto).pipe(
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

  loadDiscounts$(): Observable<GetDiscountsHttpResponse> {
    return this.getDiscounts$().pipe(
      tap((response: GetDiscountsHttpResponse) =>
        this.discounts.next(response.discounts || []),
      ),
      catchError(this.handleError),
    );
  }

  getDiscounts$(dto?: GetDiscountsHttpQuery) {
    return this.http
      .get<GetDiscountsHttpResponse>(this.getDiscountsUrl, {
        params: dto as HttpParams,
      })
      .pipe(catchError(this.handleError));
  }

  getDiscount$(id: string, dto?: GetDiscountHttpQuery) {
    const url = this.getDiscountUrl.replace(':id', id);
    return this.http
      .get<GetDiscountHttpResponse>(url, {
        params: dto as HttpParams,
      })
      .pipe(catchError(this.handleError));
  }

  removeDiscount$(id: string) {
    return this.http
      .delete<void>(this.removeDiscountUrl.replace(':id', id))
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new HttpCustomException(error));
  }
}
