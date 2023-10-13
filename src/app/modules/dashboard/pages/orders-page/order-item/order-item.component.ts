import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { OrderItemRO } from '@ro';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
  standalone: true,
  imports: [MatCardModule],
})
export class OrderItemComponent {
  @Input() item: OrderItemRO;
}
