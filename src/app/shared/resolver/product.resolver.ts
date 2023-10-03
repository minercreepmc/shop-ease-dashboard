import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProductModel } from '@model';
import { ProductService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<ProductModel> {
  constructor(private readonly productService: ProductService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ProductModel> {
    const id = route.paramMap.get('id');
    return this.productService.getProduct$(id!);
  }
}
