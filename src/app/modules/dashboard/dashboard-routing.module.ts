import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AnalyticPageComponent } from './pages/analytic-page/analytic-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: AnalyticPageComponent },
      {
        path: 'products',
        loadChildren: () =>
          import('./pages/products-page/products-page.route').then(
            (m) => m.ProductsPageRouteModule
          ),
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./pages/categories-page/categories-page.route').then(
            (m) => m.CategoriesPageRouteModule
          ),
      },
      {
        path: 'discounts',
        loadChildren: () =>
          import('./pages/discounts-page/discounts-page.route').then(
            (m) => m.DiscountsPageRoutingModule
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
