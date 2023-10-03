import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { DiscountModel } from '@model';
import { DiscountService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiscountResolver implements Resolve<DiscountModel> {
  constructor(private readonly discountService: DiscountService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<DiscountModel> {
    const id = route.paramMap.get('id');
    return this.discountService.getDiscount$(id!);
  }
}
