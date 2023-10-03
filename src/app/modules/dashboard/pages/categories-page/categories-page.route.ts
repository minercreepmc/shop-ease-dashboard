import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesResolver, CategoryResolver } from '@shared/resolver';
import { CategoryHomeComponent } from './category-home/category-home.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryHomeComponent,
    resolve: { categories: CategoriesResolver },
  },
  {
    path: ':id',
    resolve: { category: CategoryResolver },
    loadComponent: () =>
      import('./category-details/category-details.component').then(
        (m) => m.CategoryDetailsComponent,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesPageRouteModule {}
