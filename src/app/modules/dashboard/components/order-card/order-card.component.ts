import { DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { numberFormat } from '@constant';
import { OrderRO } from '@ro';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, DecimalPipe],
})
export class OrderCardComponent {
  @Input() order: OrderRO;

  numberFormat = numberFormat;
}
