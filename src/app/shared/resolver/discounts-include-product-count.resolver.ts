import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DiscountIncludeProductCountRO } from '@ro';
import { DiscountService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiscountsIncludeProductCountResolver
  implements Resolve<DiscountIncludeProductCountRO[]>
{
  constructor(private discountService: DiscountService) {}
  resolve(): Observable<DiscountIncludeProductCountRO[]> {
    this.discountService.getDiscountsIncludeProductCount$().subscribe({
      next: (discounts) => {
        this.discountService.setDiscounts$(discounts);
      },
    });
    return this.discountService.discounts$;
  }
}
