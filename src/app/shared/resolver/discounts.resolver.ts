import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DiscountModel } from '@model';
import { DiscountService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiscountsResolver implements Resolve<DiscountModel[]> {
  constructor(private readonly discountService: DiscountService) {}
  resolve(): Observable<DiscountModel[]> {
    this.discountService.getDiscounts$().subscribe({
      next: (discounts) => {
        this.discountService.setDiscounts$(discounts);
      },
    });
    return this.discountService.discounts$.asObservable();
  }
}
