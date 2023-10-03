import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateDiscountDto } from '@dto';
import { DiscountModel } from '@model';
import { ProductsTableComponent } from '@modules/dashboard/components/products-table/products-table.component';
import { DiscountService } from '@service';
import { ToastrCustomModule } from '@shared/libraries/toastr';

@Component({
  selector: 'app-discount-details',
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    NgIf,
    NgFor,
    NgClass,
    AsyncPipe,
    ProductsTableComponent,
    MatTooltipModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    ToastrCustomModule,
  ],
})
export class DiscountDetailsComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly discountService: DiscountService,
  ) {}
  discountForm: FormGroup;
  updateDiscountDto: UpdateDiscountDto;
  discount: DiscountModel;

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.discount = data.discount;
    });
  }

  onSubmit() {
    this.discountService
      .updateDiscount$(this.discount.id, this.updateDiscountDto)
      .subscribe({
        next: () => {
          this.router.navigate(['/discounts']);
        },
      });
  }

  deleteDiscount() {
    return this.discountService.deleteDiscount$(this.discount.id).subscribe({
      next: () => {
        this.router.navigate(['/discounts']);
      },
    });
  }
}
