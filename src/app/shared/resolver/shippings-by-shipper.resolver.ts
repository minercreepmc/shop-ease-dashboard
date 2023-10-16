import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ShippingRO } from '@ro';
import { AuthService, ShippingService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShippingsByShipperResolver implements Resolve<ShippingRO[]> {
  constructor(
    private shippingService: ShippingService,
    private authService: AuthService,
  ) {}
  resolve(): Observable<ShippingRO[]> {
    this.authService.profile$.subscribe({
      next: (profile) => {
        this.shippingService.getByShipperId$(profile.id).subscribe({
          next: (shippings) => {
            this.shippingService.setShippings$(shippings);
          },
        });
      },
    });

    return this.shippingService.shippings$;
  }
}
