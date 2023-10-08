import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateDiscountDto } from '@dto';
import { DiscountService } from '@service';
import { ToastrCustomService } from '@shared/libraries/toastr';

@Component({
  selector: 'app-discount-form',
  templateUrl: './discount-form.component.html',
  styleUrls: ['./discount-form.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class DiscountFormComponent {
  constructor(
    private discountService: DiscountService,
    private dialogRef: MatDialogRef<DiscountFormComponent>,
    private toast: ToastrCustomService,
  ) {}
  createDiscountDto = new CreateDiscountDto();

  onSubmit() {
    this.discountService.createDiscount$(this.createDiscountDto).subscribe({
      next: () => {
        this.toast.success('Create successfully');
      },
      error: (e) => {
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
