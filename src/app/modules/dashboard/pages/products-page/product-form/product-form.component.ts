import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { HttpCustomException } from '@shared/dtos';
import {
  ToastrCustomModule,
  ToastrCustomService,
} from '@shared/libraries/toastr';
import { ProductService } from '@service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CategoryModel } from '@model';
import { ActivatedRoute } from '@angular/router';
import { CreateProductDto } from '@dto';
//import { MaterialFileInputModule } from 'ngx-material-file-input';

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
    //MaterialFileInputModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    ToastrCustomModule,
  ],
})
export class ProductFormComponent implements OnInit {
  product: CreateProductDto;
  categories: CategoryModel[] = [];
  faX = faX;

  ngOnInit() {
    this.product = this.route.snapshot.data.product;
    this.categories = this.route.snapshot.data.categories;
  }

  // handleFileInput(event: Event) {
  //   const inputFile = event.target as HTMLInputElement;
  //   if (inputFile && inputFile.files && inputFile.files.length > 0) {
  //     const file = inputFile.files[0];
  //     this.productForm.patchValue({
  //       image: file,
  //     });
  //   }
  // }

  onSubmit() {
    // const productDto = this.productForm.value;
    // productDto.price = Number(productDto.price);
    // if (productDto.image) {
    //   productDto.image = productDto.image._files[0];
    // }
    this.productService.createProduct$(this.product).subscribe({
      next: () => {
        this.toast.success('Product created successfully');
      },
      error: (exception: HttpCustomException) => {
        throw exception;
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
    private readonly route: ActivatedRoute,
    private readonly toast: ToastrCustomService,
  ) {}
}
