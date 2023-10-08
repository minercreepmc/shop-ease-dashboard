import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolver, StaffsResolver } from '@shared/resolver';
import { UsersPageComponent } from './users-page.component';

const routes: Routes = [
  {
    path: '',
    component: UsersPageComponent,
    resolve: { staffs: StaffsResolver },
  },
  {
    path: ':id',
    resolve: { user: UserResolver },
    loadComponent: () =>
      import('./user-details/user-details.component').then(
        (m) => m.UserDetailsComponent,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule {}
