import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  CurrencyEnum,
  currencyEnumToJSON,
} from '@protos/api/http/v1/product.http.api.v1';
import { HttpCustomException } from '@shared/dtos';
import { ProductService } from '@shared/services';

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

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: '',
      price: this.formBuilder.group({
        amount: 0,
        currency: currencyEnumToJSON(CurrencyEnum.USD),
      }),
      image: '',
      description: null,
    });
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
    productDto.price.amount = Number(productDto.price.amount);
    productDto.price.currency = currencyEnumToJSON(CurrencyEnum.USD);
    this.productService.createProduct(productDto).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (exception: HttpCustomException) => {
        console.log(this.productForm.value);
        throw exception;
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  constructor(
    private readonly productService: ProductService,
    private readonly formBuilder: FormBuilder
  ) {}
}
