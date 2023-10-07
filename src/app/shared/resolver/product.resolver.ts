import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProductRO } from '@ro';
import { ProductService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<ProductRO> {
  constructor(private readonly productService: ProductService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ProductRO> {
    const id = route.paramMap.get('id');
    return this.productService.getProduct$(id!);
  }
}
