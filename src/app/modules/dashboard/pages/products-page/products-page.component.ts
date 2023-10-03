import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductsTableComponent } from '@modules/dashboard/components/products-table/products-table.component';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@service';
import { ProductModel } from '@model';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    ProductFormComponent,
    MatSlideToggleModule,
    MatButtonModule,
    ProductsTableComponent,
  ],
})
export class ProductsPageComponent implements OnInit {
  constructor(
    private readonly productService: ProductService,
    private readonly route: ActivatedRoute,
  ) {}
  products: ProductModel[] = [];
  selectedProductIds: string[];
  productFormVisibility = false;

  ngOnInit() {
    this.route.data.subscribe({
      next: (data) => {
        this.products = data.products;
      },
    });
    this.selectedProductIds = [];
  }

  onSelectedProductIdsChange(productIds: string[]) {
    this.selectedProductIds = productIds;
  }

  deleteProduct() {
    this.productService.deleteProducts$(this.selectedProductIds).subscribe();
  }

  toggleAddForm = () => {
    this.productFormVisibility = !this.productFormVisibility;
  };
}
