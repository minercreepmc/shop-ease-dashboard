import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  ShippingResolver,
  ShippingsByShipperResolver,
  ShippingStatusListResolver,
} from '@shared/resolver';
import { ShippingPageComponent } from './shipping-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShippingPageComponent,
    resolve: { shippings: ShippingsByShipperResolver },
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./shipping-details/shipping-details.component').then(
        (m) => m.ShippingDetailsComponent,
      ),
    resolve: {
      shipping: ShippingResolver,
      statusList: ShippingStatusListResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShippingRoutingModule {}
