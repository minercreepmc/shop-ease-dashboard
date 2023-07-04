import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AnalyticBodyComponent } from './analytic-body/analytic-body.component';
import { AnalyticHeaderComponent } from './analytic-header/analytic-header.component';
import { AnalyticPageComponent } from './analytic-page.component';

@NgModule({
  declarations: [
    AnalyticBodyComponent,
    AnalyticHeaderComponent,
    AnalyticPageComponent,
  ],
  imports: [SharedModule],
  exports: [
    AnalyticBodyComponent,
    AnalyticHeaderComponent,
    AnalyticPageComponent,
  ],
})
export class AnalyticPageModule {}
