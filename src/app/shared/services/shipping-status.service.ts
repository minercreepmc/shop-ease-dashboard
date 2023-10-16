import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import { CreateShippingStatusDto, UpdateShippingStatusDto } from '@dto';
import { ShippingStatusModel } from '@model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShippingStatusService {
  constructor(private http: HttpClient) {}

  private shippingStatusList = new BehaviorSubject<any>([]);

  get shippingStatusList$() {
    return this.shippingStatusList.asObservable();
  }

  setList(shippings: any[]) {
    this.shippingStatusList.next(shippings);
  }

  create$(dto: CreateShippingStatusDto): Observable<ShippingStatusModel> {
    return this.http
      .post<ShippingStatusModel>(
        ApiApplication.SHIPPING_STATUS.CONTROLLER +
          '/' +
          ApiApplication.SHIPPING_STATUS.CREATE,
        dto,
      )
      .pipe(
        tap((shippingStatus) => {
          this.setList([shippingStatus, ...this.shippingStatusList.value]);
        }),
      );
  }

  delete$(id: string): Observable<ShippingStatusModel> {
    return this.http
      .delete<ShippingStatusModel>(
        ApiApplication.SHIPPING_STATUS.CONTROLLER +
          '/' +
          ApiApplication.SHIPPING_STATUS.DELETE.replace(':id', id),
      )
      .pipe(
        tap(() => {
          this.setList(
            this.shippingStatusList.value.filter(
              (s: ShippingStatusModel) => s.id !== id,
            ),
          );
        }),
      );
  }

  update$(
    id: string,
    dto: UpdateShippingStatusDto,
  ): Observable<ShippingStatusModel> {
    return this.http
      .put<ShippingStatusModel>(
        ApiApplication.SHIPPING_STATUS.CONTROLLER +
          '/' +
          ApiApplication.SHIPPING_STATUS.UPDATE.replace(':id', id),
        dto,
      )
      .pipe(
        tap((shippingStatus) => {
          this.setList(
            this.shippingStatusList.value.map((s: ShippingStatusModel) =>
              s.id === shippingStatus.id ? shippingStatus : s,
            ),
          );
        }),
      );
  }

  getByShipping$(shippingId: string): Observable<ShippingStatusModel[]> {
    return this.http.post<ShippingStatusModel[]>(
      ApiApplication.SHIPPING_STATUS.CONTROLLER +
        '/' +
        ApiApplication.SHIPPING_STATUS.GET_BY_SHIPPING_ID,
      { shippingId },
    );
  }
}
