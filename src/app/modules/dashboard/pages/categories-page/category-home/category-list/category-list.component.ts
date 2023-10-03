import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { CategoryModel } from '@model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  standalone: true,
  imports: [RouterModule, NgIf, MatListModule, NgFor, MatIconModule],
})
export class CategoryListComponent {
  @Input() categories: CategoryModel[] | null = [];
}
