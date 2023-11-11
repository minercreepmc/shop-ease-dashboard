import { DatePipe, DecimalPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { OrderService } from '@service';
import { OrderGetAllDataRO } from '@ro';
import { numberFormat, OrderStatus } from '@constant';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    DecimalPipe,
    DatePipe,
    MatButtonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgIf,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatInputModule,
  ],
})
export class OrderListComponent implements OnInit {
  displayedColumns: string[] = [
    'member_name',
    'member_phone',
    'total_price',
    'created_at',
  ];
  dataSource: MatTableDataSource<OrderGetAllDataRO>;
  pageEvent: PageEvent;
  totalItems: number;
  itemsPerPage = 5;
  page = 1;
  numberFormat = numberFormat;
  loading = true;
  orderStatus = OrderStatus;
  currentStatus = OrderStatus.PROCESSING;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private orderService: OrderService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.orderService
      .getOrders$({
        page: this.page,
        limit: this.itemsPerPage,
      })
      .subscribe({
        next: (response) => {
          const { data, meta } = response;
          console.log(response);
          this.loading = false;
          this.totalItems = meta.totalItems;
          this.dataSource = new MatTableDataSource(data);
          this.cd.detectChanges();
        },
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getNextData(currentSize: number, pageIndex: number, pageSize: number) {
    this.orderService
      .getOrders$({
        page: pageIndex + 1,
        limit: pageSize,
        status: this.currentStatus,
      })
      .subscribe({
        next: (response) => {
          const { data } = response;
          this.loading = false;
          this.dataSource = new MatTableDataSource(data);
          this.dataSource._updateChangeSubscription();
          this.itemsPerPage = pageSize;
          this.page = pageIndex + 1;
          this.cd.detectChanges();
        },
      });
  }

  handlePageChange(event: PageEvent) {
    this.loading = true;

    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;

    const previousIndex = event.previousPageIndex;
    const previousSize = pageSize * pageIndex;

    this.getNextData(previousSize, pageIndex, pageSize);
  }

  getOrderList($event: MatSelectChange) {
    this.currentStatus = $event.value;
    this.page = 1;
    this.orderService
      .getOrders$({
        page: this.page,
        limit: this.itemsPerPage,
        status: this.currentStatus,
      })
      .subscribe({
        next: (response) => {
          const { data, meta } = response;
          this.loading = false;
          this.totalItems = meta.totalItems;
          this.dataSource = new MatTableDataSource(data);
          this.cd.detectChanges();
        },
      });
  }
}
