import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProductModel } from '@model';
import { ProductService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsResolver implements Resolve<ProductModel[]> {
  constructor(private readonly productService: ProductService) {}
  resolve(): Observable<ProductModel[]> {
    this.productService.getProducts$().subscribe({
      next: (products) => {
        this.productService.setProducts$(products);
      },
    });
    return this.productService.products$.asObservable();
  }
}
