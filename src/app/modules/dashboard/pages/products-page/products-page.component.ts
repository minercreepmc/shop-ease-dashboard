import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductFormComponent } from './product-form/product-form.component';
import { Observable } from 'rxjs';
import { ProductModel, ProductService } from '@shared/services';

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
  ],
})
export class ProductsPageComponent implements OnInit {
  products$: Observable<ProductModel[]>;
  selectedProductIds: string[];
  productFormVisibility = false;
  displayedColumns: string[] = ['select', 'name', 'image', 'price'];

  ngOnInit() {
    this.productService.loadProducts$().subscribe();
    this.products$ = this.productService.products$;
    this.selectedProductIds = [];
  }

  onToggleCheckbox(productId: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      // Add the product's id to the selectedProducts array if it's not already included
      if (!this.selectedProductIds.includes(productId)) {
        this.selectedProductIds.push(productId);
      }
    } else {
      // Remove the product's id from the selectedProducts array if it's checked off
      this.selectedProductIds = this.selectedProductIds.filter(
        (id) => id !== productId
      );
    }
  }

  deleteProduct() {
    this.productService.removeProducts$(this.selectedProductIds).subscribe();
  }

  toggleAddForm = () => {
    this.productFormVisibility = !this.productFormVisibility;
  };

  constructor(private readonly productService: ProductService) {}
}
