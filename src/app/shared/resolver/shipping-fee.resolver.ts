import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ShippingFeeModel } from '@model';
import { ShippingFeeService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShippingFeeResolver implements Resolve<ShippingFeeModel> {
  constructor(private readonly shippingFeeService: ShippingFeeService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ShippingFeeModel> {
    const id = route.paramMap.get('id');
    return this.shippingFeeService.getFee$(id!);
  }
}
