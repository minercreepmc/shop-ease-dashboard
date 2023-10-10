import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingFeeResolver, ShippingFeesResolver } from '@shared/resolver';
import { ShippingFeePageComponent } from './shipping-fee-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShippingFeePageComponent,
    resolve: {
      fees: ShippingFeesResolver,
    },
  },
  {
    path: ':id',
    resolve: { fee: ShippingFeeResolver },
    loadComponent: () =>
      import('./shipping-fee-details/shipping-fee-details.component').then(
        (m) => m.ShippingFeeDetailsComponent,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShippingFeeRoutingModule {}
