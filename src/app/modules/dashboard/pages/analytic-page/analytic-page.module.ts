import { NgModule } from '@angular/core';
import { AnalyticBodyComponent } from './analytic-body/analytic-body.component';
import { AnalyticHeaderComponent } from './analytic-header/analytic-header.component';
import { AnalyticPageComponent } from './analytic-page.component';

@NgModule({
  declarations: [
    AnalyticBodyComponent,
    AnalyticHeaderComponent,
    AnalyticPageComponent,
  ],
  exports: [
    AnalyticBodyComponent,
    AnalyticHeaderComponent,
    AnalyticPageComponent,
  ],
})
export class AnalyticPageModule {}
