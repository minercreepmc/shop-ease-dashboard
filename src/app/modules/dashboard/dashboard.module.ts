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
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';

@NgModule({
  declarations: [
    MenuComponent,
    NavigationComponent,
    UserDropdownComponent,
    DashboardComponent,
    //CategoryFormComponent,
    CategoriesPageComponent,
    //CategoryButtonComponent,
    //CategoryListComponent,
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,
    ProductsPageComponent,
    AnalyticPageModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ProductService],
})
export class DashboardModule {}
