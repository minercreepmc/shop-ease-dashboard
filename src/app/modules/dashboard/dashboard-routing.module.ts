import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AnalyticPageComponent } from './pages/analytic-page/analytic-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: AnalyticPageComponent },
      {
        path: 'products',
        component: ProductsPageComponent,
      },
      {
        path: 'categories',
        component: CategoriesPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
