import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountsHomeComponent } from './discounts-home/discounts-home.component';

const routes: Routes = [
  {
    path: '',
    component: DiscountsHomeComponent,
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./discount-details/discount-details.component').then(
        (m) => m.DiscountDetailsComponent,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountsPageRoutingModule {}
