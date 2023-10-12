import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShippingPageComponent } from './shipping-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShippingPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShippingRoutingModule {}
