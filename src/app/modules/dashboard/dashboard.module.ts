import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '@shared/services';
import { SharedModule } from '@shared/shared.module';
import { MenuComponent } from './components/menu/menu.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AnalyticPageModule } from './pages/analytic-page/analytic-page.module';
import { ProductFormComponent } from './pages/products-page/product-form/product-form.component';
import { ProductListComponent } from './pages/products-page/product-list/product-list.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { ProductButtonComponent } from './pages/products-page/product-button/product-button.component';
import { CategoryButtonComponent } from './components/category-button/category-button.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryListComponent } from './components/category-list/category-list.component';

@NgModule({
  declarations: [
    MenuComponent,
    NavigationComponent,
    UserDropdownComponent,
    DashboardComponent,
    ProductsPageComponent,
    ProductListComponent,
    CategoryFormComponent,
    ProductFormComponent,
    CategoriesPageComponent,
    ProductButtonComponent,
    CategoryButtonComponent,
    CategoryListComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    AnalyticPageModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ProductService],
})
export class DashboardModule {}
