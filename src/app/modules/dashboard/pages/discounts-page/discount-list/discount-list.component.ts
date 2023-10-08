import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.scss'],
  standalone: true,
  imports: [MatListModule, MatIconModule, NgFor, RouterLink],
})
export class DiscountListComponent {
  discounts: any[] = [];
}
