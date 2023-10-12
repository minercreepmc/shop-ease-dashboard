import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { numberFormat } from '@constant';
import { OrderRO } from '@ro';
import { OrderService } from '@service';
import { ShippersDialogComponent } from '../shippers-dialog/shippers-dialog.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatSortModule, DecimalPipe, MatButtonModule],
})
export class OrderListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'member_name',
    'member_phone',
    'total_price',
    'status',
    'action',
  ];
  dataSource: MatTableDataSource<OrderRO>;
  numberFormat = numberFormat;

  constructor(
    private orderService: OrderService,
    private dialog: MatDialog,
  ) {}

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

  openDialog(orderId: string) {
    const dialogRef = this.dialog.open(ShippersDialogComponent, {
      data: orderId,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
