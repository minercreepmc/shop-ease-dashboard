import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import { OrderStatus } from '@constant';
import { OrderCardComponent } from '@modules/dashboard/components';
import { SkeletonComponent } from '@modules/dashboard/components/skeleton/skeleton.component';
import { OrderRO, ShippingRO } from '@ro';
import { OrderItemListComponent } from '../order-item-list/order-item-list.component';
import { OrderStatusComponent } from '../order-status/order-status.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  standalone: true,
  imports: [
    SkeletonComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    OrderCardComponent,
    OrderItemListComponent,
    OrderStatusComponent,
    NgIf,
    MatProgressBarModule,
  ],
})
export class OrderDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  order: OrderRO;
  shipping: ShippingRO;
  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.order = data.order;
      this.shipping = data.shipping;
    });
  }

  getProgressBarValue() {
    const { status } = this.order;

    switch (status) {
      case OrderStatus.PROCESSING:
      case OrderStatus.CANCELED:
      case OrderStatus.REFUSED:
        return 0;
      case OrderStatus.ASSIGNED:
        return 20;
      case OrderStatus.ACCEPTED:
        return 35;
      case OrderStatus.DELIVERING:
        return 60;
      case OrderStatus.DELIVERED:
        return 90;
      case OrderStatus.COMPLETED:
        return 100;
    }
    return 0;
  }

  isAssigned() {
    return this.order.status === OrderStatus.ASSIGNED;
  }
}
