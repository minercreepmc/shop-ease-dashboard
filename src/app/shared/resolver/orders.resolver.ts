import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { OrderGetAllRO } from '@ro';
import { OrderService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersResolver implements Resolve<OrderGetAllRO> {
  constructor(private readonly orderService: OrderService) {}
  resolve(): Observable<OrderGetAllRO> {
    this.orderService.getOrders$().subscribe({
      next: (orders) => {
        this.orderService.setOrders$(orders);
      },
    });
    return this.orderService.orders$;
  }
}
