import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UserRole } from '@constant';
import { DiscountFormComponent } from './discount-form/discount-form.component';
import { DiscountListComponent } from './discount-list/discount-list.component';

@Component({
  selector: 'app-discounts-page',
  templateUrl: './discounts-page.component.html',
  styleUrls: ['./discounts-page.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    DiscountListComponent,
    NgIf,
  ],
})
export class DiscountsPageComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {}

  role: string;

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.role = data.profile.role;
    });
  }

  isAdmin() {
    return this.role === UserRole.ADMIN;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DiscountFormComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
