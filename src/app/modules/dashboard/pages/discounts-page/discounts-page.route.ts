import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountResolver, DiscountsResolver } from '@shared/resolver';
import { DiscountsHomeComponent } from './discounts-home/discounts-home.component';

const routes: Routes = [
  {
    path: '',
    component: DiscountsHomeComponent,
    resolve: { discounts: DiscountsResolver },
  },
  {
    path: ':id',
    resolve: { discount: DiscountResolver },
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
