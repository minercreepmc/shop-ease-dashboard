import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderRO } from '@ro';

@Component({
  selector: 'app-order-home',
  templateUrl: './order-home.component.html',
  styleUrls: ['./order-home.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, RouterLink],
})
export class OrderHomeComponent implements OnInit {
  orders: OrderRO[] = [];
  constructor(private readonly route: ActivatedRoute) {}
  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.orders = data.orders;
    });
  }
}
