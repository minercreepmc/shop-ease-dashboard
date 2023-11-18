import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import {
  CreateShippingDto,
  ShippingGetAllDto,
  ShippingGetDetailDto,
} from '@dto';
import { ShippingModel } from '@model';
import { ShippingGetAllRO, ShippingGetDetailRO, ShippingRO } from '@ro';
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

  getAll$(dto?: ShippingGetAllDto) {
    return this.http.get<ShippingGetAllRO>(
      ApiApplication.SHIPPING.CONTROLLER +
        '/' +
        ApiApplication.SHIPPING.GET_ALL,
      {},
    );
  }

  getDetail$(dto: ShippingGetDetailDto) {
    return this.http.post<ShippingGetDetailRO>(
      ApiApplication.SHIPPING.CONTROLLER +
        '/' +
        ApiApplication.SHIPPING.GET_DETAIL,
      {
        params: dto ? this.toHttpParams(dto) : undefined,
      },
    );
  }

  toHttpParams(request: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(request).forEach(function (key) {
      httpParams = httpParams.append(key, request[key]);
    });
    return httpParams;
  }
}
