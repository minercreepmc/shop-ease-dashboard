import { Component } from '@angular/core';
import { AnalyticBodyComponent } from './analytic-body/analytic-body.component';
import { AnalyticHeaderComponent } from './analytic-header/analytic-header.component';

@Component({
  selector: 'app-analytic-page',
  templateUrl: './analytic-page.component.html',
  styleUrls: ['./analytic-page.component.scss'],
  standalone: true,
  imports: [AnalyticHeaderComponent, AnalyticBodyComponent],
})
export class AnalyticPageComponent {}
