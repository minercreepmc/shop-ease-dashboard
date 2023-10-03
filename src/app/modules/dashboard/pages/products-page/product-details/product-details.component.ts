import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import {
  ToastrCustomModule,
  ToastrCustomService,
} from '@shared/libraries/toastr';
import { ProductService } from '@shared/services';
import { MatSelectModule } from '@angular/material/select';
import { DiscountModel } from '@model';
import { UpdateProductDto } from '@dto';
import { ProductRO } from '@ro';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    AsyncPipe,
    NgFor,
    ToastrCustomModule,
  ],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private readonly productService: ProductService,
    private readonly route: ActivatedRoute,
    private readonly toast: ToastrCustomService,
  ) {}
  product: ProductRO;
  discounts: DiscountModel[];
  updateProductDto: UpdateProductDto;

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
    this.discounts = this.route.snapshot.data['discounts'];
  }

  onSubmit() {
    this.productService
      .updateProduct$(this.product.id, this.updateProductDto)
      .subscribe({
        next: () => {
          this.toast.success('Product updated');
        },
        error: () => {
          this.toast.error('Product not updated');
        },
      });
  }
}
