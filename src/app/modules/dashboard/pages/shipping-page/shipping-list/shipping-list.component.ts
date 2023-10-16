import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShippingRO } from '@ro';
import { ShippingCardComponent } from '../shipping-card/shipping-card.component';

@Component({
  selector: 'app-shipping-list',
  templateUrl: './shipping-list.component.html',
  styleUrls: ['./shipping-list.component.scss'],
  standalone: true,
  imports: [ShippingCardComponent, NgFor, RouterLink],
})
export class ShippingListComponent {
  @Input() shippings: ShippingRO[];
}
