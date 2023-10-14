import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderResolver, ShippingByOrderResolver } from '@shared/resolver';
import { OrdersResolver } from '@shared/resolver/orders.resolver';
import { ShippersResolver } from '@shared/resolver/shippers.resolver';
import { OrdersPageComponent } from './orders-page.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersPageComponent,
    resolve: { orders: OrdersResolver },
  },
  {
    path: ':id',
    resolve: {
      order: OrderResolver,
      shippers: ShippersResolver,
      shipping: ShippingByOrderResolver,
    },
    loadComponent: () =>
      import('./order-details/order-details.component').then(
        (m) => m.OrderDetailsComponent,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersPageRoutingModule {}
