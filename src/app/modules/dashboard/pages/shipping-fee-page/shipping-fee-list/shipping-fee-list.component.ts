import { DecimalPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { numberFormat } from '@constant';
import { ShippingFeeModel } from '@model';
import { ShippingFeeService } from '@service';

@Component({
  selector: 'app-shipping-fee-list',
  templateUrl: './shipping-fee-list.component.html',
  styleUrls: ['./shipping-fee-list.component.scss'],
  standalone: true,
  imports: [NgFor, RouterLink, MatListModule, DecimalPipe, MatIconModule],
})
export class ShippingFeeListComponent implements OnInit {
  constructor(private shippingFeeService: ShippingFeeService) {}

  fees: ShippingFeeModel[];

  numberFormat = numberFormat;

  ngOnInit() {
    this.shippingFeeService.fees$.subscribe({
      next: (fees) => {
        console.log(fees);
        this.fees = fees;
      },
    });
  }
}
