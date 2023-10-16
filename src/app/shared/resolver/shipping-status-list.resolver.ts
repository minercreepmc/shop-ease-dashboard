import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ShippingStatusModel } from '@model';
import { ShippingStatusService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShippingStatusListResolver
  implements Resolve<ShippingStatusModel[]>
{
  constructor(private shippingStatusService: ShippingStatusService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<ShippingStatusModel[]> {
    const id = route.paramMap.get('id');
    this.shippingStatusService.getByShipping$(id!).subscribe({
      next: (shippings) => {
        this.shippingStatusService.setList(shippings);
      },
    });

    return this.shippingStatusService.shippingStatusList$;
  }
}
