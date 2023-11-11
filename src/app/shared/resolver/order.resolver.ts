import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { OrderGetDetailsRO } from '@ro';
import { OrderService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderResolver implements Resolve<OrderGetDetailsRO> {
  constructor(private orderService: OrderService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<OrderGetDetailsRO> {
    const id = route.paramMap.get('id');
    return this.orderService.getOrder$(id!);
  }
}
