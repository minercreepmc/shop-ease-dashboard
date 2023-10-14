import { DatePipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { OrderStatus } from '@constant';
import { ConfirmDialogComponent } from '@modules/dashboard/components/confirm-dialog/confirm-dialog.component';
import { OrderRO, ShippingRO } from '@ro';
import { ShippingService } from '@service';
import { ToastrCustomService } from '@shared/libraries/toastr';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    NgIf,
    DatePipe,
    ConfirmDialogComponent,
  ],
})
export class OrderStatusComponent {
  constructor(
    private shippingService: ShippingService,
    private toast: ToastrCustomService,
    private dialog: MatDialog,
  ) {}
  @Input() order: OrderRO;
  @Input() shipping: ShippingRO;

  isAssigned() {
    return this.order.status === OrderStatus.ASSIGNED;
  }

  onCancelClick() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteShipping();
      }
    });
  }

  deleteShipping() {
    this.shippingService.delete$(this.order.id).subscribe({
      next: () => {
        this.toast.success('Cancel order success!');
      },
      error: (e) => {
        e.error.message.forEach((m: any) => {
          this.toast.error(m.error);
        });

        console.log(e);
      },
      complete: () => {
        window.location.reload();
      },
    });
  }
}
