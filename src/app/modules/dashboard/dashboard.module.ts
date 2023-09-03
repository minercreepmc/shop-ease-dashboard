import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AnalyticPageModule } from './pages/analytic-page/analytic-page.module';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { DiscountsPageComponent } from './pages/discounts-page/discounts-page.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';

@NgModule({
  imports: [
    UserDropdownComponent,
    SharedModule,
    DashboardRoutingModule,
    ProductsPageComponent,
    AnalyticPageModule,
    CategoriesPageComponent,
    DiscountsPageComponent,
    ReactiveFormsModule,
    DashboardComponent,
    FormsModule,
    OrdersPageComponent,
    UsersPageComponent,
  ],
})
export class DashboardModule {}
