import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProductWithImagesRO } from '@ro';
import { ProductService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductWithImagesResolver
  implements Resolve<ProductWithImagesRO[]>
{
  constructor(private readonly productService: ProductService) {}
  resolve(): Observable<ProductWithImagesRO[]> {
    this.productService.getProductsWithImages$().subscribe({
      next: (products) => {
        this.productService.setProducts$(products);
      },
    });
    return this.productService.products$.asObservable();
  }
}
