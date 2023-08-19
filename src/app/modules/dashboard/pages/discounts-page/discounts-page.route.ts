import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscountsHomeComponent } from './discounts-home/discounts-home.component';

const routes: Routes = [
  {
    path: '',
    component: DiscountsHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiscountsPageRoutingModule {}
