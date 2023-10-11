import { Component } from '@angular/core';
import { SkeletonComponent } from '@modules/dashboard/components/skeleton/skeleton.component';
import { OrderListComponent } from './order-list/order-list.component';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
  standalone: true,
  imports: [SkeletonComponent, OrderListComponent],
})
export class OrdersPageComponent {}
