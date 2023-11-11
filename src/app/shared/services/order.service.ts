import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import { OrderGetAllDto, UpdateOrderDto } from '@dto';
import { Observable, ReplaySubject } from 'rxjs';
import { OrderModel } from '@model';
import { OrderGetAllRO } from '@ro';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private readonly http: HttpClient) {}
  private orders = new ReplaySubject<any>();
  get orders$() {
    return this.orders;
  }

  setOrders$(orders: any) {
    this.orders.next(orders);
  }

  getOrder$(id: string): Observable<any> {
    return this.http.get<any>(
      ApiApplication.ORDER.CONTROLLER +
        '/' +
        ApiApplication.ORDER.GET_ONE.replace(':orderId', id),
    );
  }

  getByMember$(): Observable<OrderGetAllRO[]> {
    return this.http.get<OrderGetAllRO[]>(
      ApiApplication.ORDER.CONTROLLER +
        '/' +
        ApiApplication.ORDER.GET_BY_MEMBER,
    );
  }

  updateOrder$(id: string, dto: UpdateOrderDto): Observable<OrderModel> {
    return this.http.put<OrderModel>(
      ApiApplication.ORDER.CONTROLLER +
        '/' +
        ApiApplication.ORDER.UPDATE.replace(':id', id),
      dto,
    );
  }

  getOrders$(dto?: OrderGetAllDto): Observable<OrderGetAllRO> {
    return this.http.get<OrderGetAllRO>(
      ApiApplication.ORDER.CONTROLLER + '/' + ApiApplication.ORDER.GET_ALL,
      {
        params: dto ? this.toHttpParams(dto) : undefined,
      },
    );
  }

  countDaily$(): Observable<number> {
    return this.http.post<number>(
      ApiApplication.ORDER.CONTROLLER + '/' + ApiApplication.ORDER.COUNT_DAILY,
      {},
    );
  }

  countWeekly$(): Observable<number> {
    return this.http.post<number>(
      ApiApplication.ORDER.CONTROLLER + '/' + ApiApplication.ORDER.COUNT_WEEKLY,
      {},
    );
  }

  countMonthly$(): Observable<number> {
    return this.http.post<number>(
      ApiApplication.ORDER.CONTROLLER +
        '/' +
        ApiApplication.ORDER.COUNT_MONTHLY,
      {},
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
