import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OrderItemRO } from '@ro';
import { OrderItemComponent } from '../order-item/order-item.component';

@Component({
  selector: 'app-order-item-list',
  templateUrl: './order-item-list.component.html',
  styleUrls: ['./order-item-list.component.scss'],
  standalone: true,
  imports: [NgFor, OrderItemComponent],
})
export class OrderItemListComponent {
  @Input() items: OrderItemRO[];
}
