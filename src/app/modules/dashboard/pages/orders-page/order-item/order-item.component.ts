import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { numberFormat } from '@constant';
import { OrderItemRO } from '@ro';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
  standalone: true,
  imports: [MatCardModule, DecimalPipe],
})
export class OrderItemComponent {
  @Input() item: OrderItemRO;
  numberFormat = numberFormat;
}
