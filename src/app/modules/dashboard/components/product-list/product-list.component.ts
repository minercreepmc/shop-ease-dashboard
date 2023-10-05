import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';
import { ProductModel } from '@model';
import { ProductService } from '@service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [
    MatGridListModule,
    ProductCardComponent,
    AsyncPipe,
    NgFor,
    RouterLink,
    MatCardModule,
    FlexLayoutModule,
  ],
})
export class ProductListComponent implements OnInit {
  constructor(private readonly productService: ProductService) {}
  products: ProductModel[] = [];

  ngOnInit() {
    this.productService.products$.subscribe({
      next: (products) => {
        this.products = products;
      },
    });
  }
}
