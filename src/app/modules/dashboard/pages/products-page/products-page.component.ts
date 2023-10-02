import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductFormComponent } from './product-form/product-form.component';
import { Observable } from 'rxjs';
import { ProductModel, ProductService } from '@shared/services';
import { ProductsTableComponent } from '@modules/dashboard/components/products-table/products-table.component';

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
  products: ProductModel[] = [];
  selectedProductIds: string[];
  productFormVisibility = false;

  ngOnInit() {
    this.productService.getProducts$().subscribe({
      next: (products) => {
        this.productService.setProducts$(products);
        this.products = products;
      },
    });
    this.selectedProductIds = [];
  }

  onSelectedProductIdsChange(productIds: string[]) {
    this.selectedProductIds = productIds;
  }

  deleteProduct() {
    this.productService.removeProducts$(this.selectedProductIds).subscribe();
  }

  toggleAddForm = () => {
    this.productFormVisibility = !this.productFormVisibility;
  };

  constructor(private readonly productService: ProductService) {}
}
