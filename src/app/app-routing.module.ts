import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from '@modules/dashboard/pages/dashboard-page/dashboard-page.component';
import { SignInPageComponent } from '@modules/sign-in/pages/sign-in-page/sign-in-page.component';

const routes: Routes = [
  {
    path: '',
    component: SignInPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
