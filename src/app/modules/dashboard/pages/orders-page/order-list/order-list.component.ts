import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { numberFormat } from '@constant';
import { OrderRO } from '@ro';
import { OrderService } from '@service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatSortModule, DecimalPipe],
})
export class OrderListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'member_name',
    'member_phone',
    'total_price',
    'status',
  ];
  dataSource: MatTableDataSource<OrderRO>;
  numberFormat = numberFormat;

  constructor(private orderService: OrderService) {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.orderService.orders$.subscribe({
      next: (orders) => {
        this.dataSource = new MatTableDataSource(orders);
      },
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
