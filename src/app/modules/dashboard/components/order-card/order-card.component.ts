import { DecimalPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { numberFormat, OrderStatus } from '@constant';
import { ShippersDialogComponent } from '@modules/dashboard/pages/orders-page/shippers-dialog/shippers-dialog.component';
import { OrderGetDetailsRO } from '@ro';
import { OrderService } from '@service';
import { ToastrCustomService } from '@shared/libraries/toastr';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DecimalPipe,
    NgIf,
    RouterModule,
  ],
})
export class OrderCardComponent {
  constructor(
    private dialog: MatDialog,
    private orderService: OrderService,
    private toast: ToastrCustomService,
  ) {}
  @Input() order: OrderGetDetailsRO;

  numberFormat = numberFormat;

  openDialog() {
    const dialogRef = this.dialog.open(ShippersDialogComponent, {
      data: {
        order: this.order,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        window.location.reload();
      }
    });
  }

  onCancelClick() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cancelOrder();
      }
    });
  }

  cancelOrder() {
    this.orderService
      .updateOrder$(this.order.id, {
        status: OrderStatus.CANCELED,
      })
      .subscribe({
        next: () => {
          this.toast.success('Từ chối đơn hàng thành công!');
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

  assignShow() {
    return this.isRefused() || this.isProcessing();
  }

  isProcessing() {
    return this.order.status === OrderStatus.PROCESSING;
  }

  isAssigned() {
    return this.order.status === OrderStatus.ASSIGNED;
  }

  isShipping() {
    return this.order.status === OrderStatus.DELIVERING;
  }

  isRefused() {
    return this.order.status === OrderStatus.REJECTED;
  }

  isCancel() {
    return this.order.status === OrderStatus.CANCELED;
  }
}
