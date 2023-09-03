import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class OrdersPageComponent {}
