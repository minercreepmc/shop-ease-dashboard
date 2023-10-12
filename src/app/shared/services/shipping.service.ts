import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import { CreateShippingDto } from '@dto';
import { ShippingModel } from '@model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShippingService {
  constructor(private http: HttpClient) {}

  create$(dto: CreateShippingDto): Observable<ShippingModel> {
    return this.http.post<ShippingModel>(
      ApiApplication.SHIPPING.CONTROLLER + '/' + ApiApplication.SHIPPING.CREATE,
      dto,
    );
  }
}
