import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpCustomException } from '@api/http';
import { CreateCategoryDto } from '@dto';
import { CategoryModel } from '@model';
import { CategoryService } from '@service';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';

@Component({
  selector: 'app-category-home',
  templateUrl: './category-home.component.html',
  styleUrls: ['./category-home.component.scss'],
  standalone: true,
  imports: [CategoryFormComponent, CategoryListComponent, AsyncPipe, NgIf],
})
export class CategoryHomeComponent implements OnInit {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly route: ActivatedRoute,
  ) {}
  categories: CategoryModel[] = [];
  createCategoryDto: CreateCategoryDto;

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.categories = data.categories;
    });
  }

  onSubmit() {
    this.createCategory();
  }

  createCategory() {
    this.categoryService.createCategory$(this.createCategoryDto).subscribe({
      next: () => {
        console.log('next');
      },
      error: (exception: HttpCustomException) => {
        throw exception;
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
