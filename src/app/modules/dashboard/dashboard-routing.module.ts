import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('./pages/products-page/products-page.route').then(
            (m) => m.ProductsPageRouteModule,
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./pages/categories-page/categories-page.route').then(
            (m) => m.CategoriesPageRouteModule,
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/users-page/users-page.route').then(
            (m) => m.UsersPageRoutingModule,
          ),
      },
      {
        path: 'discounts',
        loadChildren: () =>
          import('./pages/discounts-page/discounts-page.route').then(
            (m) => m.DiscountsPageRoutingModule,
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./pages/orders-page/orders-page.route').then(
            (m) => m.OrdersPageRoutingModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
