import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import {
  ToastrCustomModule,
  ToastrCustomService,
} from '@shared/libraries/toastr';
import {
  ProductModel,
  ProductService,
  UpdateProductRequestDto,
} from '@shared/services';
import { CategoriesChipComponent } from './categories-chip/categories-chip.component';
import { CategoryModel } from '@shared/services/category';
import { V1DiscountModel } from '@api/http';
import { MatSelectModule } from '@angular/material/select';
import { DiscountService } from '@shared/services/discount';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    AsyncPipe,
    NgFor,
    CategoriesChipComponent,
    ToastrCustomModule,
  ],
  providers: [ProductService],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private readonly productService: ProductService,
    private readonly discoutService: DiscountService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly toast: ToastrCustomService,
  ) {}
  product: ProductModel;
  categories: CategoryModel[];
  discounts: V1DiscountModel[] = [];
  productForm: FormGroup;
  id: string;

  onCategoriesChange(newValue: CategoryModel[]) {
    this.categories = newValue;
    this.productForm.patchValue({
      categoryIds: newValue.map((category) => category.id),
    });
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    this.productForm = this.formBuilder.group<UpdateProductRequestDto>({
      id: ' ',
      name: '',
      description: '',
      price: 0,
      image: undefined,
      discountId: '',
      categoryIds: [],
    });
    this.productService.getProduct$(this.id).subscribe({
      next: (product) => {
        console.log(product);
        this.product = product;
        this.categories = product.categories as CategoryModel[];
        this.productForm.patchValue({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          discountId: product.discount_id,
          categoryIds: product.category_ids,
        });
      },
      error: () => {
        this.toast.error('Product not found');
      },
    });
    this.discoutService.getDiscounts$().subscribe({
      next: (response) => {
        this.discounts = response.discounts || [];
      },
    });
  }

  onSubmit() {
    const productDto = this.productForm.value;
    productDto.price = Number(productDto.price);
    return this.updateProduct(productDto);
  }

  updateProduct(dto: UpdateProductRequestDto) {
    console.log(dto);
    this.productService.updateProduct$(dto).subscribe({
      next: (response) => {
        this.product = {
          id: response.id,
          name: response.name || this.product.name,
          description: response.description,
          price: response.price || this.product.price,
          image_url: response.imageUrl || this.product.image_url,
          discount_id: response.discountId,
          category_ids: response.categoryIds,
        };
        this.toast.success('Product updated');
      },
      error: () => {
        this.toast.error('Product not updated');
      },
    });
  }
}
