import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffsResolver } from '@shared/resolver/staffs.resolver';
import { UsersPageComponent } from './users-page.component';

const routes: Routes = [
  {
    path: '',
    component: UsersPageComponent,
    resolve: { staffs: StaffsResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersPageRoutingModule {}
