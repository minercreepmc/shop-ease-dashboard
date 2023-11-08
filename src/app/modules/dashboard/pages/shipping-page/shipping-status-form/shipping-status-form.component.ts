import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateShippingStatusDto } from '@dto';
import { WhiteFormComponent } from '@modules/dashboard/components/white-form/white-form.component';
import { ShippingStatusService } from '@service';
import { ToastrCustomService } from '@shared/libraries/toastr';

@Component({
  selector: 'app-shipping-status-form',
  templateUrl: './shipping-status-form.component.html',
  styleUrls: ['./shipping-status-form.component.scss'],
  standalone: true,
  imports: [
    WhiteFormComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
})
export class ShippingStatusFormComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private shipingStatusService: ShippingStatusService,
    private toast: ToastrCustomService,
    private dialogRef: MatDialogRef<ShippingStatusFormComponent>,
  ) {}
  createShippingStatusDto = new CreateShippingStatusDto();

  ngOnInit(): void {
    this.createShippingStatusDto.shippingId = this.data.shippingId;
  }

  createShippingStatus() {
    this.shipingStatusService.create$(this.createShippingStatusDto).subscribe({
      next: () => {
        this.toast.success('Thêm tình trạng đơn thành công');
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
