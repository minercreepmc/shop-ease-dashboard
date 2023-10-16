import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UpdateShippingStatusDto } from '@dto';
import { ShippingStatusModel } from '@model';
import { WhiteFormComponent } from '@modules/dashboard/components/white-form/white-form.component';
import { ShippingStatusService } from '@service';
import { ToastrCustomService } from '@shared/libraries/toastr';

@Component({
  selector: 'app-shipping-status-update-form',
  templateUrl: './shipping-status-update-form.component.html',
  styleUrls: ['./shipping-status-update-form.component.scss'],
  standalone: true,
  imports: [
    WhiteFormComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
})
export class ShippingStatusUpdateFormComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ShippingStatusModel,
    private shipingStatusService: ShippingStatusService,
    private toast: ToastrCustomService,
    private dialogRef: MatDialogRef<ShippingStatusUpdateFormComponent>,
  ) {}
  updateShippingStatusDto = new UpdateShippingStatusDto();

  ngOnInit(): void {
    this.updateShippingStatusDto = {
      ...this.data,
    };
    console.log('update', this.updateShippingStatusDto);
  }

  updateShippingStatus() {
    this.shipingStatusService
      .update$(this.data.id, this.updateShippingStatusDto)
      .subscribe({
        next: () => {
          this.toast.success('Update shipping status successfully');
        },
        error: (e: HttpErrorResponse) => {
          e.error.message.forEach((m: any) => {
            this.toast.error(m.error);
          });
          console.log(e);
        },
        complete: () => {
          this.dialogRef.close();
        },
      });
  }
}
