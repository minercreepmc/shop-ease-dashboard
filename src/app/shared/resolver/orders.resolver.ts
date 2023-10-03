import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { OrderRO } from '@ro';
import { OrderService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersResolver implements Resolve<OrderRO[]> {
  constructor(private readonly orderService: OrderService) {}
  resolve(): Observable<OrderRO[]> {
    this.orderService.getOrders$().subscribe({
      next: (orders) => {
        this.orderService.setOrders$(orders);
      },
    });
    return this.orderService.orders$;
  }
}
