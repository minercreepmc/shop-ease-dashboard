import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInPageComponent } from '@modules/log-in/pages/sign-in-page/log-in-page.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { ProfileResolver } from '@shared/resolver';

const routes: Routes = [
  {
    path: '',
    component: LogInPageComponent,
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    resolve: {
      profile: ProfileResolver
    },
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
