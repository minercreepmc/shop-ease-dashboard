import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersHomeComponent } from './users-home/users-home.component';

const routes: Routes = [
  {
    path: '',
    component: UsersHomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule {}
