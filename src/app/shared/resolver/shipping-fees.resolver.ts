import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ShippingFeeModel } from '@model';
import { ShippingFeeService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShippingFeesResolver implements Resolve<ShippingFeeModel[]> {
  constructor(private shippingFeeService: ShippingFeeService) {}
  resolve(): Observable<ShippingFeeModel[]> {
    this.shippingFeeService.getFees$().subscribe({
      next: (fees) => {
        this.shippingFeeService.setFees(fees);
      },
    });
    return this.shippingFeeService.fees$;
  }
}
