import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ShippingFeeGetAllDataRO } from '@ro/shipping-fee.ro';
import { ShippingFeeService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShippingFeesResolver
  implements Resolve<ShippingFeeGetAllDataRO[]>
{
  constructor(private shippingFeeService: ShippingFeeService) {}
  resolve(): Observable<ShippingFeeGetAllDataRO[]> {
    this.shippingFeeService.getFees$().subscribe({
      next: (response) => {
        this.shippingFeeService.setFees(response.data);
      },
    });
    return this.shippingFeeService.fees$;
  }
}
