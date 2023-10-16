import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ShippingRO } from '@ro';
import { ShippingCardComponent } from '../shipping-card/shipping-card.component';

@Component({
  selector: 'app-shipping-list',
  templateUrl: './shipping-list.component.html',
  styleUrls: ['./shipping-list.component.scss'],
  standalone: true,
  imports: [ShippingCardComponent, NgFor],
})
export class ShippingListComponent {
  @Input() shippings: ShippingRO[];
}
