import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryHomeComponent } from './category-home/category-home.component';

const routes: Routes = [
  {
    path: '',
    component: CategoryHomeComponent,
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./category-details/category-details.component').then(
        (m) => m.CategoryDetailsComponent
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesPageRouteModule {}
