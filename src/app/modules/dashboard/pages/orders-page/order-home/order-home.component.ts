import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { OrderService } from '@shared/services/order';
import { OrderModel } from '@shared/services/order/order.service.dto';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-order-home',
  templateUrl: './order-home.component.html',
  styleUrls: ['./order-home.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, RouterLink],
})
export class OrderHomeComponent implements OnInit {
  orders$: Observable<OrderModel[]>;
  constructor(private readonly orderService: OrderService) {}
  ngOnInit() {
    this.orders$ = this.orderService
      .getOrders$()
      .pipe(map((response) => response.orders));
  }
}
