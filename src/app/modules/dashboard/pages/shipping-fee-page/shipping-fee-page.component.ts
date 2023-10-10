import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ShippingFeeFormComponent } from './shipping-fee-form/shipping-fee-form.component';
import { ShippingFeeListComponent } from './shipping-fee-list/shipping-fee-list.component';

@Component({
  selector: 'app-shipping-fee-page',
  templateUrl: './shipping-fee-page.component.html',
  styleUrls: ['./shipping-fee-page.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, ShippingFeeListComponent],
})
export class ShippingFeePageComponent {
  constructor(private dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ShippingFeeFormComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
