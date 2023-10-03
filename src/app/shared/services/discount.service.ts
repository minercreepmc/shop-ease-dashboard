import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import { CreateDiscountDto, UpdateDiscountDto } from '@dto';
import { DiscountModel } from '@model';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiscountService {
  constructor(private readonly http: HttpClient) {}
  private discounts = new BehaviorSubject<DiscountModel[]>([]);
  get discounts$() {
    return this.discounts;
  }

  setDiscounts$(discounts: DiscountModel[]) {
    this.discounts.next(discounts);
  }

  createDiscount$(dto: CreateDiscountDto) {
    return this.http
      .post<DiscountModel>(
        ApiApplication.DISCOUNT.CONTROLLER +
          '/' +
          ApiApplication.DISCOUNT.CREATE,
        dto,
      )
      .pipe(
        tap((newDiscount: DiscountModel) => {
          this.discounts.next([...this.discounts.value, newDiscount]);
        }),
      );
  }

  updateDiscount$(id: string, dto: UpdateDiscountDto) {
    return this.http
      .put<DiscountModel>(
        ApiApplication.DISCOUNT.CONTROLLER +
          '/' +
          ApiApplication.DISCOUNT.UPDATE.replace(':id', id),
        dto,
      )
      .pipe(
        tap((updateDiscount) => {
          this.discounts.next(
            this.discounts.value.map((category) => {
              if (category.id === updateDiscount.id) {
                return updateDiscount;
              }
              return category;
            }),
          );
        }),
      );
  }

  getDiscounts$() {
    return this.http.get<DiscountModel[]>(
      ApiApplication.DISCOUNT.CONTROLLER +
        '/' +
        ApiApplication.DISCOUNT.GET_ALL,
    );
  }

  getDiscount$(id: string) {
    return this.http.get<DiscountModel>(
      ApiApplication.DISCOUNT.CONTROLLER +
        '/' +
        ApiApplication.DISCOUNT.GET_ONE.replace(':id', id),
    );
  }

  removeDiscount$(id: string) {
    return this.http.delete<DiscountModel>(
      ApiApplication.DISCOUNT.CONTROLLER +
        '/' +
        ApiApplication.DISCOUNT.DELETE.replace(':id', id),
    );
  }
}
