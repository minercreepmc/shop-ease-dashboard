import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { numberFormat } from '@constant';
import { UpdateProductDto } from '@dto';
import { CategoryModel, DiscountModel } from '@model';
import { ProductSliderComponent } from '@modules/dashboard/components/product-slider/product-slider.component';
import { ProductRO } from '@ro';
import { CategoryService, DiscountService, ProductService } from '@service';
import {
  ToastrCustomModule,
  ToastrCustomService,
} from '@shared/libraries/toastr';
import { MaterialFileInputModule } from 'ngx-material-file-input';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [
    ProductSliderComponent,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MaterialFileInputModule,
    MatIconModule,
    MatButtonModule,
    ToastrCustomModule,
    MatDialogModule,
    NgFor,
  ],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private productSerivce: ProductService,
    private discountService: DiscountService,
    private categoryService: CategoryService,
    private toast: ToastrCustomService,
  ) {}
  product: ProductRO;
  discounts: DiscountModel[];
  categories: CategoryModel[];
  updateProductDto = new UpdateProductDto();
  numberFormat = numberFormat;

  ngOnInit(): void {
    this.product = this.route.snapshot.data.product;
    this.discountService.discounts$.subscribe({
      next: (discounts) => {
        this.discounts = discounts;
      },
    });
    this.categoryService.categories$.subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });
  }

  onNameChange($event: any) {
    this.updateProductDto.name = $event.target.value;
  }

  onDescriptionChange($event: any) {
    this.updateProductDto.description = $event.target.value;
  }

  onPriceChange($event: any) {
    this.updateProductDto.price = $event.target.value;
  }

  onDiscountChange($event: MatSelectChange) {
    this.updateProductDto.discountId = $event.value;
  }

  onCategoriesChange($event: MatSelectChange) {
    this.updateProductDto.categoryIds = $event.value;
  }

  onSubmit() {
    this.updateProduct(this.product.id, this.updateProductDto);
  }

  updateProduct(id: string, dto: UpdateProductDto) {
    console.log(dto);
    this.productSerivce.updateProduct$(id, dto).subscribe({
      next: () => {
        this.toast.success('Update product successfully');
      },
      error: (e) => {
        console.log(e);
      },
    });
    console.log(this.updateProductDto);
  }
}
