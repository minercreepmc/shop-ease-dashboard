import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { ShipperGetAllDataRO } from '@ro';
import { UserService } from '@service';

@Component({
  selector: 'app-shipper-list',
  templateUrl: './shipper-list.component.html',
  styleUrls: ['./shipper-list.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSelectModule,
    RouterLink,
    MatSortModule,
    MatInputModule
  ],
})
export class ShipperListComponent implements OnInit {
  displayedColumns: string[] = ['full_name', 'phone', 'email', 'is_shipping'];
  dataSource: MatTableDataSource<ShipperGetAllDataRO>;
  pageEvent: PageEvent;
  totalItems: number;
  itemsPerPage = 5;
  page = 1;
  loading = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.userService
      .getAllShippers$({
        page: this.page,
        limit: this.itemsPerPage,
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getNextData(currentSize: number, pageIndex: number, pageSize: number) {
    this.userService
      .getAllShippers$({
        page: pageIndex + 1,
        limit: pageSize,
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
}
