import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { numberFormat } from '@constant';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faCoffee,
  faDollarSign,
  faShoppingCart,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import {
  IncomeService,
  OrderService,
  ProductService,
  UserService,
} from '@service';

@Component({
  selector: 'app-analytic-header',
  templateUrl: './analytic-header.component.html',
  styleUrls: ['./analytic-header.component.scss'],
  standalone: true,
  imports: [
    FontAwesomeModule,
    DecimalPipe,
    MatSelectModule,
    MatFormFieldModule,
  ],
})
export class AnalyticHeaderComponent implements OnInit {
  constructor(
    private incomeService: IncomeService,
    private productService: ProductService,
    private orderService: OrderService,
    private userService: UserService,
  ) {}
  faUsers = faUsers;

  faShoppingCart = faShoppingCart;
  faCoffee = faCoffee;
  faDollarSign = faDollarSign;

  income: number;
  sold: number;
  orderCount: number;
  memberCount: number;
  numberFormat = numberFormat;
  ngOnInit(): void {
    this.getDailyStatistics();
  }

  getDailyStatistics() {
    this.incomeService.getDailyIncome$().subscribe((res) => {
      this.income = res;
    });
    this.productService.getDailySold$().subscribe((res) => {
      this.sold = res;
    });
    this.orderService.countDaily$().subscribe((res) => {
      this.orderCount = res;
    });
    this.userService.countDailyMember$().subscribe((res) => {
      this.memberCount = res;
    });
  }

  getMonthlyStatistics() {
    this.incomeService.getMonthlyIncome$().subscribe((res) => {
      this.income = res;
    });
    this.productService.getMonthlySold$().subscribe((res) => {
      this.sold = res;
    });
    this.orderService.countMonthly$().subscribe((res) => {
      this.orderCount = res;
    });
    this.userService.countMonthlyMember$().subscribe((res) => {
      this.memberCount = res;
    });
  }

  getWeeklyStatistics() {
    this.incomeService.getWeeklyIncome$().subscribe((res) => {
      this.income = res;
    });
    this.productService.getWeeklySold$().subscribe((res) => {
      this.sold = res;
    });
    this.orderService.countWeekly$().subscribe((res) => {
      this.orderCount = res;
    });
    this.userService.countWeeklyMember$().subscribe((res) => {
      this.memberCount = res;
    });
  }
}
