import { DatePipe, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ShippingStatusModel } from '@model';
import { ConfirmDialogComponent } from '@modules/dashboard/components';
import { ShippingStatusService } from '@service';
import { ToastrCustomService } from '@shared/libraries/toastr';
import { ShippingStatusUpdateFormComponent } from '../shipping-status-update-form/shipping-status-update-form.component';

@Component({
  selector: 'app-shipping-status-list',
  templateUrl: './shipping-status-list.component.html',
  styleUrls: ['./shipping-status-list.component.scss'],
  standalone: true,
  imports: [MatListModule, NgFor, DatePipe, MatIconModule],
})
export class ShippingStatusListComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private shippingStatusService: ShippingStatusService,
    private toast: ToastrCustomService,
  ) {}
  @Input() statusList: ShippingStatusModel[] = [];
  offset: number;

  ngOnInit() {
    this.offset = new Date().getTimezoneOffset();
  }

  onDeleteClick(id: string) {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {},
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.shippingStatusService.delete$(id).subscribe({
            next: () => {
              this.toast.success('Delete shipping status success!');
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

  onUpdateClick(status: ShippingStatusModel) {
    this.dialog
      .open(ShippingStatusUpdateFormComponent, {
        data: {
          ...status,
        },
      })
      .afterClosed()
      .subscribe();
  }
}
