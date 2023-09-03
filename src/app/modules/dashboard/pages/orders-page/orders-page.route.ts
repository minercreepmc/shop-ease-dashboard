import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderHomeComponent } from './order-home/order-home.component';

const routes: Routes = [
  {
    path: '',
    component: OrderHomeComponent,
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./order-details/order-details.component').then(
        (m) => m.OrderDetailsComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersPageRoutingModule {}
