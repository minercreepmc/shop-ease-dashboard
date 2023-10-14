import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { OrderRO } from '@ro';
import { OrderService } from '@service';
import { Columns, Config, DefaultConfig, TableModule } from 'ngx-easy-table';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe, MatButtonModule, RouterModule, TableModule],
})
export class OrderListComponent implements OnInit {
  constructor(
    private router: Router,
    private orderService: OrderService,
  ) {}
  displayedColumns: string[] = [
    'member_name',
    'member_phone',
    'total_price',
    'status',
    'action',
  ];
  columns: Columns[] = [
    { key: 'member_name', title: 'Member' },
    { key: 'member_phone', title: 'Phone' },
    { key: 'address_location', title: 'Address' },
    { key: 'total_price', title: 'Total' },
    { key: 'status', title: 'Status' },
  ];
  configuration: Config;
  clicked: string;
  orders: OrderRO[] = [];

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.orderService.orders$.subscribe({
      next: (orders) => {
        console.log(orders);
        this.orders = orders;
      },
    });
  }
  eventEmitted($event: { event: string; value: any }): void {
    this.clicked = JSON.stringify($event);
    // eslint-disable-next-line no-console
    console.log($event);
    this.router.navigate(['dashboard', 'orders', $event.value?.row?.id]);
  }
}
