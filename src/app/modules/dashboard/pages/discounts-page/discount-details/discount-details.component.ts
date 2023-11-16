import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateDiscountDto } from '@dto';
import { ConfirmDialogComponent } from '@modules/dashboard/components';
import { ProductListComponent } from '@modules/dashboard/components/product-list/product-list.component';
import { DiscountRO } from '@ro';
import { DiscountService } from '@service';
import { ToastrCustomService } from '@shared/libraries/toastr';

@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ProductListComponent,
  ],
})
export class DiscountDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private discountService: DiscountService,
    private toast: ToastrCustomService,
    private dialog: MatDialog,
    private router: Router,
  ) {}
  updateDiscountDto = new UpdateDiscountDto();
  discount: DiscountRO;

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.discount = data.discount;
    });
  }

  onNameChange($event: any) {
    this.updateDiscountDto.name = $event.target.value;
  }

  onDescriptionChange($event: any) {
    this.updateDiscountDto.description = $event.target.value;
  }

  onPercentageChange($event: any) {
    this.updateDiscountDto.percentage = $event.target.value;
  }

  onSubmit() {
    this.discountService
      .updateDiscount$(this.discount.id, this.updateDiscountDto)
      .subscribe({
        next: () => {
          this.toast.success('Cập nhật giảm giá thành công');
        },
        error: (e) => {
          e.error.message.forEach((m: any) => {
            this.toast.error(m.error);
          });
          console.log(e);
        },
        complete: () => {
          this.updateDiscountDto = new UpdateDiscountDto();
        },
      });
  }

  deleteDiscount() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.discountService.deleteDiscount$(this.discount.id).subscribe({
          next: () => {
            this.toast.success('Xóa giảm giá thành công');
          },
          complete: () => {
            this.router.navigate(['/discounts']);
          },
        });
      }
    });
  }
}
