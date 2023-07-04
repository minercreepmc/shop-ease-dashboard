import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AnalyticPageComponent } from './pages/analytic-page/analytic-page.component';
import { DashboardFormPageComponent } from './pages/dashboard-form-page/dashboard-form-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: AnalyticPageComponent },
      {
        path: 'form',
        component: DashboardFormPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
