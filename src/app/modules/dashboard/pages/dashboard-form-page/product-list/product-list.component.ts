import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  GetProductsResponseDto,
  Product,
  ProductService,
} from '@shared/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  selectedProducts: boolean[];

  @ViewChild('dropdown') dropdown: ElementRef;
  @Output() addProductButtonClicked = new EventEmitter();
  @Output() addCategoryButtonClicked = new EventEmitter();
  ngOnInit() {
    this.productService
      .loadProducts$()
      .subscribe((response: GetProductsResponseDto) => {
        this.selectedProducts = Array(response.products.length).fill(false);
      });
    this.products$ = this.productService.products$;
  }

  onAddProductButtonClicked() {
    this.addProductButtonClicked.emit();
    this.dropdown.nativeElement.removeAttribute('open');
  }

  onAddCategoryButtonClicked() {
    this.addCategoryButtonClicked.emit();
    this.dropdown.nativeElement.removeAttribute('open');
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
