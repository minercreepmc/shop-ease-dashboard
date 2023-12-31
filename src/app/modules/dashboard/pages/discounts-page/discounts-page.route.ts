import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  DiscountResolver,
  DiscountsIncludeProductCountResolver,
} from '@shared/resolver';
import { ProfileResolver } from '@shared/resolver';
import { DiscountsPageComponent } from './discounts-page.component';

const routes: Routes = [
  {
    path: '',
    component: DiscountsPageComponent,
    resolve: {
      discounts: DiscountsIncludeProductCountResolver,
      profile: ProfileResolver,
    },
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
