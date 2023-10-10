import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserRole } from '@constant';
import { DiscountIncludeProductCountRO } from '@ro';
import { DiscountService } from '@service';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.scss'],
  standalone: true,
  imports: [MatListModule, MatIconModule, NgFor, RouterLink],
})
export class DiscountListComponent implements OnInit {
  constructor(
    private discountService: DiscountService,
    private route: ActivatedRoute,
  ) {}
  discounts: DiscountIncludeProductCountRO[] = [];
  role: string;

  ngOnInit(): void {
    this.discountService.discounts$.subscribe({
      next: (discounts) => {
        this.discounts = discounts;
      },
    });
    this.route.data.subscribe((data) => {
      this.role = data.profile.role;
    })
  }

  isAdmin() {
    return this.role === UserRole.ADMIN;
  }
}
