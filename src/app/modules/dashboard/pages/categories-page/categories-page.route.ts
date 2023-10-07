import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryResolver } from '@shared/resolver';
import { CategoriesIncludeCountResolver } from '@shared/resolver/categories-include-count.resolver';
import { CategoriesPageComponent } from './categories-page.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPageComponent,
    resolve: { categories: CategoriesIncludeCountResolver },
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
