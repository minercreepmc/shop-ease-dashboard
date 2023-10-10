import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateShippingFeeDto } from '@dto';
import { ShippingFeeService } from '@service';
import { ToastrCustomService } from '@shared/libraries/toastr';

@Component({
  selector: 'app-shipping-fee-form',
  templateUrl: './shipping-fee-form.component.html',
  styleUrls: ['./shipping-fee-form.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class ShippingFeeFormComponent {
  constructor(
    private shippingFeeService: ShippingFeeService,
    private toast: ToastrCustomService,
    private dialogRef: MatDialogRef<ShippingFeeFormComponent>,
  ) {}
  createShippingFeeDto = new CreateShippingFeeDto();

  onSubmit() {
    this.shippingFeeService.createFee$(this.createShippingFeeDto).subscribe({
      next: () => {
        this.toast.success('Created successfully');
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
