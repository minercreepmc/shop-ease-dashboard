import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CategoriesResolver,
  DiscountsResolver,
  ProductResolver,
} from '@shared/resolver';
import { ProductWithImagesResolver } from '@shared/resolver/product-with-images.resolver';
import { ProductsPageComponent } from './products-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsPageComponent,
    resolve: {
      products: ProductWithImagesResolver,
      categories: CategoriesResolver,
      discounts: DiscountsResolver,
    },
  },
  {
    path: ':id',
    resolve: {
      product: ProductResolver,
      discounts: DiscountsResolver,
      categories: CategoriesResolver,
    },
    loadComponent: () =>
      import('./product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsPageRouteModule {}
