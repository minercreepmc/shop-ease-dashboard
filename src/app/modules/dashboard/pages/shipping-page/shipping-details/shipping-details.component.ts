import { DecimalPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { numberFormat, OrderStatus } from '@constant';
import { ShippingStatusModel } from '@model';
import { ConfirmDialogComponent } from '@modules/dashboard/components';
import { SkeletonComponent } from '@modules/dashboard/components/skeleton/skeleton.component';
import { ShippingRO } from '@ro';
import { OrderService, ShippingStatusService } from '@service';
import { ToastrCustomService } from '@shared/libraries/toastr';
import { ShippingStatusFormComponent } from '../shipping-status-form/shipping-status-form.component';
import { ShippingStatusListComponent } from '../shipping-status-list/shipping-status-list.component';

@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    DecimalPipe,
    SkeletonComponent,
    MatButtonModule,
    ShippingStatusListComponent,
    NgIf,
  ],
})
export class ShippingDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private shippingStatusService: ShippingStatusService,
    private orderService: OrderService,
    private toast: ToastrCustomService,
  ) {}
  numberFormat = numberFormat;
  DELIVERED = OrderStatus.DELIVERED;

  shipping: ShippingRO;
  statusList: ShippingStatusModel[];

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (data) => {
        this.shipping = data.shipping;
      },
    });
    this.shippingStatusService.shippingStatusList$.subscribe({
      next: (statusList) => {
        this.statusList = statusList;
      },
    });
  }

  createButtonShow() {
    console.log(this.shipping.status);
    return this.isDelivering();
  }

  isDelivering() {
    return this.shipping.status === OrderStatus.DELIVERING;
  }

  onCreateClick() {
    const dialogRef = this.dialog.open(ShippingStatusFormComponent, {
      data: {
        shippingId: this.shipping.id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  onDeliverClick() {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {},
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.deliverShipping();
        }
      });
  }

  deliverShipping() {
    this.orderService
      .updateOrder$(this.shipping.order_id, {
        status: OrderStatus.DELIVERING,
      })
      .subscribe({
        next: () => {
          this.toast.success('Deliver shipping success!');
        },
        error: (e) => {
          e.error.message.forEach((m: any) => {
            this.toast.error(m.error);
          });
          console.log(e);
        },
      });
  }
}
