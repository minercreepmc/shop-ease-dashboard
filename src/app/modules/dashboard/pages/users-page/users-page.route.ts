import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolver } from '@shared/resolver';
import { UsersResolver } from '@shared/resolver/users.resolver';
import { UsersPageComponent } from './users-page.component';

const routes: Routes = [
  {
    path: '',
    component: UsersPageComponent,
    resolve: { users: UsersResolver },
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
