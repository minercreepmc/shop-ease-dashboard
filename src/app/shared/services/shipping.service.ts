import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import { CreateShippingDto } from '@dto';
import { ShippingModel } from '@model';
import { ShippingRO } from '@ro';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShippingService {
  constructor(private http: HttpClient) {}

  private shippings = new BehaviorSubject<any>([]);

  get shippings$() {
    return this.shippings.asObservable();
  }

  setShippings$(shippings: any[]) {
    this.shippings.next(shippings);
  }

  create$(dto: CreateShippingDto): Observable<ShippingModel> {
    return this.http.post<ShippingModel>(
      ApiApplication.SHIPPING.CONTROLLER + '/' + ApiApplication.SHIPPING.CREATE,
      dto,
    );
  }

  delete$(id: string): Observable<ShippingModel> {
    return this.http.delete<ShippingModel>(
      ApiApplication.SHIPPING.CONTROLLER +
        '/' +
        ApiApplication.SHIPPING.DELETE_BY_ORDER.replace(':orderId', id),
    );
  }

  getByOrderId$(id: string): Observable<ShippingRO> {
    return this.http.post<ShippingRO>(
      ApiApplication.SHIPPING.CONTROLLER +
        '/' +
        ApiApplication.SHIPPING.GET_BY_ORDER_ID,
      {
        orderId: id,
      },
    );
  }

  getByShipperId$(shipperId: string): Observable<ShippingRO[]> {
    return this.http.post<ShippingRO[]>(
      ApiApplication.SHIPPING.CONTROLLER +
        '/' +
        ApiApplication.SHIPPING.GET_BY_SHIPPER_ID,
      {
        shipperId,
      },
    );
  }

  getShipping$(id: string): Observable<ShippingRO> {
    return this.http.get<ShippingRO>(
      ApiApplication.SHIPPING.CONTROLLER +
        '/' +
        ApiApplication.SHIPPING.GET_ONE.replace(':id', id),
    );
  }
}
