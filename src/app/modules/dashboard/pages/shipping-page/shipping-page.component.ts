import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserModel } from '@model';

@Component({
  selector: 'app-shipping-page',
  templateUrl: './shipping-page.component.html',
  styleUrls: ['./shipping-page.component.scss'],
  standalone: true,
  imports: [MatToolbarModule],
})
export class ShippingPageComponent {
  constructor(private dialog: MatDialog) {}
  shippers: UserModel[] = [];

  openDialog() {
    //
  }
}
