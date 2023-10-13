import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { OrderRO } from '@ro';
import { OrderService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderResolver implements Resolve<OrderRO> {
  constructor(private orderService: OrderService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<OrderRO> {
    const id = route.paramMap.get('id');
    return this.orderService.getOrder$(id!);
  }
}
