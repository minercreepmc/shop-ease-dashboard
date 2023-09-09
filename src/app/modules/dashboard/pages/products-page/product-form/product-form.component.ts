import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { HttpCustomException } from '@shared/dtos';
import {
  ToastrCustomModule,
  ToastrCustomService,
} from '@shared/libraries/toastr';
import { ProductService } from '@shared/services';
import { CategoryModel, CategoryService } from '@shared/services/category';
import { Observable } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ProductDomainExceptionCodes } from '@api/http/v1/exceptions';

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
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialFileInputModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    ToastrCustomModule,
  ],
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
    if (productDto.image) {
      productDto.image = productDto.image._files[0];
    }
    this.productService.createProduct$(productDto).subscribe({
      next: (response) => {
        this.toast.success(response.message || 'Product created successfully');
        this.productForm.reset();
      },
      error: (exception: HttpCustomException) => {
        console.log(exception);
        exception.message.forEach((m) => {
          if (m.code === ProductDomainExceptionCodes.NameDoesNotValid) {
            this.toast.error('Tên không hợp lệ');
          }

          if (m.code === ProductDomainExceptionCodes.PriceDoesNotValid) {
            this.toast.error('Giá không hợp lệ');
          }

          if (m.code === ProductDomainExceptionCodes.ImageDoesNotValid) {
            this.toast.error('Sản phẩm đã tồn tại');
          }
        });
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  @Output() closeButtonClicked = new EventEmitter();

  onCloseButtonClicked() {
    this.closeButtonClicked.emit();
  }

  constructor(
    private readonly productService: ProductService,
    private readonly categoryService: CategoryService,
    private readonly formBuilder: FormBuilder,
    private readonly toast: ToastrCustomService,
  ) {}
}
