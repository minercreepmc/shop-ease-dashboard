import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductModel } from '@shared/services';
import { CategoryModel, CategoryService } from '@shared/services/category';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ProductsTableComponent } from '@modules/dashboard/components/products-table/products-table.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ToastrCustomService } from '@shared/libraries/toastr';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
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
  ],
})
export class CategoryDetailsComponent implements OnInit {
  category$: Observable<CategoryModel>;
  products$: Observable<ProductModel[]>;
  categoryForm: FormGroup;
  selectedProductIds: string[] = [];
  removingProductIds: string[] = [];
  showConfirmButton = false;
  originalCategory: CategoryModel;
  id: string;
  _editMode = false;

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
      this.categoryForm.patchValue(this.originalCategory);
      this.categoryForm.disable();
    }

    if (newValue === true) {
      this.categoryForm.enable();
    }
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.category$ = this.categoryService.getCategoryWithProducts$(this.id);
    this.categoryForm = this.formBuilder.group({
      name: [{ value: '', disabled: true }],
      description: [{ value: '', disabled: true }],
      productIds: [],
    });
    this.category$.subscribe({
      next: (category: CategoryModel) => {
        this.originalCategory = category;
        this.categoryForm.patchValue(category);

        this.categoryForm.valueChanges.subscribe({
          next: () => {
            this.showConfirmButton = true;
          },
        });
      },
    });
  }

  removeCategory() {
    return this.categoryService.removeCategory$(this.id).subscribe({
      next: () => {
        this.router.navigate(['/categories']);
      }
    })
  }

  removeSelectedProducts() {
    const removeProductIds = this.selectedProductIds;
    const currentProductIds = this.categoryForm.get('productIds')
      ?.value as string[];

    if (removeProductIds?.length && currentProductIds?.length) {
      const newProductIds = currentProductIds.filter(
        (id) => !removeProductIds.includes(id)
      );
      this.categoryForm.get('productIds')?.setValue(newProductIds);
      this.removingProductIds = removeProductIds;
    }
  }

  redoRemovingProducts() {
    this.removingProductIds = [];
    this.categoryForm
      .get('productIds')
      ?.setValue(this.originalCategory?.products?.map((product) => product.id));
    console.log(this.categoryForm.get('productIds')?.value);
  }

  selectedProductsChange(products: string[]) {
    this.selectedProductIds = products;
  }

  onSubmit() {
    const formData = this.categoryForm.value;
    const categoryUpdating$ = this.categoryService.updateCategory$({
      id: this.id,
      ...formData,
    });

    categoryUpdating$.subscribe({
      next: () => {
        this.editMode = false;
        this.showConfirmButton = false;
        this.categoryForm.disable();
        this.toast.success('Category updated successfully');
      },
      error: (error) => {
        this.toast.error(error.message);
      },
    });
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoryService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toast: ToastrCustomService
  ) {}
}
