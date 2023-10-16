import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { numberFormat } from '@constant';
import { UpdateProductDto } from '@dto';
import { CategoryModel, DiscountModel } from '@model';
import { ProductSliderComponent } from '@modules/dashboard/components/product-slider/product-slider.component';
import { ProductRO } from '@ro';
import { CategoryService, DiscountService } from '@service';
import { ProductGalleryComponent } from '../product-gallery/product-gallery.component';
import { ProductUpdateFormComponent } from '../product-update-form/product-update-form.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [
    ProductSliderComponent,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ProductUpdateFormComponent,
    ProductGalleryComponent,
  ],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private discountService: DiscountService,
    private categoryService: CategoryService,
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
}
