import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { CategoryIncludeProductCountRO } from '@ro';
import { CategoryService } from '@service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  standalone: true,
  imports: [RouterLink, NgIf, MatListModule, NgFor, MatIconModule],
})
export class CategoryListComponent implements OnInit {
  constructor(private categoryService: CategoryService) {}
  categories: CategoryIncludeProductCountRO[];

  ngOnInit(): void {
    this.categoryService.categories$.subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });
  }
}
