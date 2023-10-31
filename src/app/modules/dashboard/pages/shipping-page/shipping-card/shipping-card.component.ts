import { DecimalPipe, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { numberFormat, OrderStatus } from '@constant';
import { ConfirmDialogComponent } from '@modules/dashboard/components/confirm-dialog/confirm-dialog.component';
import { ShippingRO } from '@ro';
import { OrderService } from '@service';
import { ToastrCustomService } from '@shared/libraries/toastr';

@Component({
  selector: 'app-shipping-card',
  templateUrl: './shipping-card.component.html',
  styleUrls: ['./shipping-card.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    DecimalPipe,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    NgIf,
    MatDialogModule,
    ConfirmDialogComponent,
  ],
})
export class ShippingCardComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private router: Router,
    private toast: ToastrCustomService,
    private dialog: MatDialog,
  ) {}
  @Input() shipping: ShippingRO;
  numberFormat = numberFormat;

  ngOnInit(): void {
    console.log(this.shipping);
  }

  onAcceptClick() {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {},
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.updateOrder$(OrderStatus.ACCEPTED).subscribe({
            next: () => {
              this.toast.success('Shipping accepted');
            },
            error: (e) => {
              e.error.message.forEach((m: any) => {
                this.toast.error(m.error);
              });
              console.log(e);
            },
            complete: () => {
              this.router.navigate(['/dashboard/shipping', this.shipping.id]);
            },
          });
        }
      });
  }

  onRejectClick() {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {},
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.updateOrder$(OrderStatus.REJECTED).subscribe({
            next: () => {
              this.toast.success('Shipping rejected');
            },
            error: (e) => {
              e.error.message.forEach((m: any) => {
                this.toast.error(m.error);
              });
              console.log(e);
            },
          });
        }
      });
  }

  updateOrder$(status: OrderStatus) {
    return this.orderService.updateOrder$(this.shipping.order_id, {
      status,
    });
  }

  acceptShow() {
    return this.isAssigned();
  }

  rejectShow() {
    return this.isAssigned();
  }

  isAssigned() {
    return this.shipping.status === OrderStatus.ASSIGNED;
  }

  isAccepted() {
    return this.shipping.status === OrderStatus.ACCEPTED;
  }
}
