import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsTableComponent } from '@modules/dashboard/components/products-table/products-table.component';
import {
  ToastrCustomModule,
  ToastrCustomService,
} from '@shared/libraries/toastr';
import { DiscountModel, DiscountService } from '@shared/services/discount';
import { Observable } from 'rxjs';

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
    ReactiveFormsModule,
    ToastrCustomModule,
  ],
})
export class DiscountDetailsComponent implements OnInit {
  constructor(
    private readonly discountService: DiscountService,
    private readonly toast: ToastrCustomService,
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {}
  discountForm: FormGroup;
  originalDiscount: DiscountModel;
  _editMode = false;
  discount$: Observable<DiscountModel>;
  selectedProductIds: string[] = [];
  showConfirmButton = false;
  removingProductIds: string[] = [];
  id: string;

  redoRemovingProducts() {
    // this.removingProductIds = [];
    // this.discountForm
    //   .get('productIds')
    //   ?.setValue(this.originalDiscount?.products?.map((product) => product.id));
    console.log('');
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.discount$ = this.discountService.getDiscount$(this.id);
    this.discountForm = this.formBuilder.group({
      name: [{ value: '', disabled: true }],
      description: [{ value: '', disabled: true }],
      percentage: [{ value: 0, disabled: true }],
      productIds: [],
    });
    this.discount$.subscribe({
      next: (discount: DiscountModel) => {
        this.originalDiscount = discount;
        this.discountForm.patchValue(discount);

        this.discountForm.valueChanges.subscribe({
          next: () => {
            this.showConfirmButton = true;
          },
        });
      },
    });
  }

  @Input() set editMode(value: boolean) {
    const oldValue = this._editMode;
    this._editMode = value;
    this.onEditModeChange(oldValue, this._editMode);
  }
  get editMode(): boolean {
    return this._editMode;
  }
  onEditModeChange(oldValue: boolean, newValue: boolean) {
    if (newValue === false) {
      this.discountForm.patchValue(this.originalDiscount);
      this.discountForm.disable();
    }

    if (newValue === true) {
      this.discountForm.enable();
    }
  }

  onSubmit() {
    const formData = this.discountForm.value;
    const discountUpdating$ = this.discountService.updateDiscount$(this.id, {
      ...formData,
    });

    discountUpdating$.subscribe({
      next: (response) => {
        this.editMode = false;
        this.showConfirmButton = false;
        this.discountForm.disable();
        this.toast.success('Discount updated successfully');
        this.discountForm.patchValue(response);
      },
      error: (error) => {
        this.toast.error(error.message);
      },
    });
  }

  removeSelectedProducts() {
    const removeProductIds = this.selectedProductIds;
    const currentProductIds = this.discountForm.get('productIds')
      ?.value as string[];

    if (removeProductIds?.length && currentProductIds?.length) {
      const newProductIds = currentProductIds.filter(
        (id) => !removeProductIds.includes(id),
      );
      this.discountForm.get('productIds')?.setValue(newProductIds);
      this.removingProductIds = removeProductIds;
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  selectedProductsChange(products: string[]) {
    this.selectedProductIds = products;
  }

  removeDiscount() {
    return this.discountService.removeDiscount$(this.id).subscribe({
      next: () => {
        this.router.navigate(['/discounts']);
      },
    });
  }
}
