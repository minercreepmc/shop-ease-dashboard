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

  @ViewChild('dropdown') dropdown: ElementRef;
  @Output() addProductButtonClicked = new EventEmitter();
  @Output() addCategoryButtonClicked = new EventEmitter();
  ngOnInit() {
    this.productService.loadProducts$().subscribe();
    this.products$ = this.productService.products$;
    this.selectedProductIds = [];
  }

  onAddProductButtonClicked() {
    this.addProductButtonClicked.emit();
    this.dropdown.nativeElement.removeAttribute('open');
  }

  onAddCategoryButtonClicked() {
    this.addCategoryButtonClicked.emit();
    this.dropdown.nativeElement.removeAttribute('open');
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

  onDeleteButtonClicked() {
    this.productService.removeProducts$(this.selectedProductIds).subscribe();
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.dropdown && !this.eRef.nativeElement.contains(event.target)) {
      this.dropdown.nativeElement.removeAttribute('open');
    }
  }

  constructor(
    private readonly eRef: ElementRef,
    private readonly productService: ProductService
  ) {}
}
