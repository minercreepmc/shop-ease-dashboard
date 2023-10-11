import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolver } from '@shared/resolver';
import { ShippersResolver } from '@shared/resolver/shippers.resolver';
import { ShipperPageComponent } from './shipper-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShipperPageComponent,
    resolve: { shippers: ShippersResolver },
  },
  {
    path: ':id',
    resolve: { user: UserResolver },
    loadComponent: () =>
      import('./shipper-details/shipper-details.component').then(
        (m) => m.ShipperDetailsComponent,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipperPageRoutingModule {}
