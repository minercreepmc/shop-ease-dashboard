import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Product, ProductService } from '@shared/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  selectedProductIds: string[];
  productFormVisibility = false;

  @Output() addProductButtonClicked = new EventEmitter();
  ngOnInit() {
    this.productService.loadProducts$().subscribe();
    this.products$ = this.productService.products$;
    this.selectedProductIds = [];
  }

  onAddProductButtonClicked() {
    this.addProductButtonClicked.emit();
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

  handleProductFormVisibility = () => {
    this.productFormVisibility = !this.productFormVisibility;
  };

  handleCloseButtonClicked = () => {
    this.productFormVisibility = false;
  };

  constructor(private readonly productService: ProductService) {}
}
