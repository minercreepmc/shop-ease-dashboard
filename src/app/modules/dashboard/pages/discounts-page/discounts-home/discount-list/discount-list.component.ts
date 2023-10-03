import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { DiscountModel } from '@model';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.scss'],
  standalone: true,
  imports: [MatListModule, MatIconModule, NgFor, RouterModule],
})
export class DiscountListComponent {
  @Input() discounts: DiscountModel[] | null = [];
}
