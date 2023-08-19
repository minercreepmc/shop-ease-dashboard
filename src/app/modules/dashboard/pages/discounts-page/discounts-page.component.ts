import { Component } from '@angular/core';
import { DiscountsHomeComponent } from './discounts-home/discounts-home.component';

@Component({
  selector: 'app-discounts-page',
  templateUrl: './discounts-page.component.html',
  styleUrls: ['./discounts-page.component.scss'],
  standalone: true,
  imports: [DiscountsHomeComponent],
})
export class DiscountsPageComponent {}
