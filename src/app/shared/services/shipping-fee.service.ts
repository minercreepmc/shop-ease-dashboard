import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import { CreateShippingFeeDto, UpdateShippingFeeDto } from '@dto';
import { ShippingFeeModel } from '@model';
import { ShippingFeeGetAllRO } from '@ro/shipping-fee.ro';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShippingFeeService {
  constructor(private http: HttpClient) {}
  private fees = new BehaviorSubject<any[]>([]);

  get fees$(): Observable<any[]> {
    return this.fees.asObservable();
  }

  setFees(fees: any[]) {
    this.fees.next(fees);
  }

  getFee$(id: string) {
    return this.http.get<ShippingFeeModel>(
      ApiApplication.SHIPPING_FEE.CONTROLLER +
        '/' +
        ApiApplication.SHIPPING_FEE.GET_ONE.replace(':id', id),
    );
  }

  getFees$() {
    return this.http.get<ShippingFeeGetAllRO>(
      ApiApplication.SHIPPING_FEE.CONTROLLER +
        '/' +
        ApiApplication.SHIPPING_FEE.GET_ALL,
    );
  }

  createFee$(dto: CreateShippingFeeDto) {
    return this.http
      .post<ShippingFeeModel>(
        ApiApplication.SHIPPING_FEE.CONTROLLER +
          '/' +
          ApiApplication.SHIPPING_FEE.CREATE,
        dto,
      )
      .pipe(tap((fee) => this.setFees([...this.fees.value, fee])));
  }

  updateFee$(id: string, dto: UpdateShippingFeeDto) {
    return this.http
      .put<ShippingFeeModel>(
        ApiApplication.SHIPPING_FEE.CONTROLLER +
          '/' +
          ApiApplication.SHIPPING_FEE.UPDATE.replace(':id', id),
        dto,
      )
      .pipe(tap((fee) => this.setFees([...this.fees.value, fee])));
  }
}
