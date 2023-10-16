import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ShippingRO } from '@ro';
import { ShippingService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShippingResolver implements Resolve<ShippingRO> {
  constructor(private shippingService: ShippingService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ShippingRO> {
    const id = route.paramMap.get('id');
    return this.shippingService.getShipping$(id!);
  }
}
