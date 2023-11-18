import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ShippingRO } from '@ro';
import { ShippingService } from '@service';
import { ShippingListComponent } from './shipping-list/shipping-list.component';

@Component({
  selector: 'app-shipping-page',
  templateUrl: './shipping-page.component.html',
  styleUrls: ['./shipping-page.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    ShippingListComponent,
  ],
})
export class ShippingPageComponent implements OnInit {
  constructor(private shippingService: ShippingService) {}
  shippings: ShippingRO[] = [];

  ngOnInit(): void {
    this.shippingService.getAll$().subscribe({
      next: (response) => {
        console.log(response);
        this.shippings = response.data;
      },
    });
  }

  openDialog() {
    //
  }
}
