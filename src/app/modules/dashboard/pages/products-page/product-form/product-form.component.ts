import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { HttpCustomException } from '@shared/dtos';
import {
  ToastrCustomModule,
  ToastrCustomService,
} from '@shared/libraries/toastr';
import { ProductService } from '@shared/services';
import { CategoryModel, CategoryService } from '@shared/services/category';
import { Observable } from 'rxjs';

export interface IProductFormErrors {
  name: string;
  price: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  categories$: Observable<CategoryModel[]>;
  faX = faX;

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: '',
      price: '',
      image: '',
      description: null,
      categoryIds: [],
    });
    this.categoryService.loadCategories$().subscribe();
    this.categories$ = this.categoryService.categories$;
  }

  handleFileInput(event: Event) {
    const inputFile = event.target as HTMLInputElement;
    if (inputFile && inputFile.files && inputFile.files.length > 0) {
      const file = inputFile.files[0];
      this.productForm.patchValue({
        image: file,
      });
    }
  }

  onSubmit() {
    const productDto = this.productForm.value;
    productDto.price = Number(productDto.price);
    this.productService.createProduct$(productDto).subscribe({
      next: (response) => {
        this.toast.success(response.message || 'Product created successfully');
      },
      error: (exception: HttpCustomException) => {
        throw exception;
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  // Function to handle focus event of the multiple select input
  onSelectFocus() {
    const selectMultiple = document.querySelector('.select-multiple');
    selectMultiple?.classList.add('expanded');
  }

  // Function to handle blur event of the multiple select input
  onSelectBlur() {
    const selectMultiple = document.querySelector('.select-multiple');
    selectMultiple?.classList.remove('expanded');
  }

  @Output() closeButtonClicked = new EventEmitter();

  onCloseButtonClicked() {
    this.closeButtonClicked.emit();
  }

  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly formBuilder: FormBuilder,
    private readonly toast: ToastrCustomService
  ) {}
}
