import { CommonModule } from '@angular/common';
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
import { DashboardFormPageComponent } from './pages/dashboard-form-page/dashboard-form-page.component';
import { ProductFormComponent } from './pages/dashboard-form-page/product-form/product-form.component';
import { ProductListComponent } from './pages/dashboard-form-page/product-list/product-list.component';

@NgModule({
  declarations: [
    MenuComponent,
    NavigationComponent,
    UserDropdownComponent,
    DashboardComponent,
    DashboardFormPageComponent,
    ProductFormComponent,
    ProductListComponent,
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
