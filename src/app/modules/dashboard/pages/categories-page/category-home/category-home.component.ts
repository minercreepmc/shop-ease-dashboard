import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpCustomException } from '@api/http';
import {
  CategoryModel,
  CategoryService,
  CreateCategoryHttpRequest,
  CreateCategoryHttpResponse,
  RemoveCategoriesHttpRequest,
} from '@shared/services/category';
import { Observable } from 'rxjs';
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
  categories$: Observable<CategoryModel[]>;
  categoryForm: FormGroup;
  selectedCategoryIds: string[] = [];
  isSelecting = false;

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: '',
    });
    this.categoryService.loadCategories$().subscribe();
    this.categories$ = this.categoryService.categories$;
  }

  createCategory(dto: CreateCategoryHttpRequest) {
    this.categoryService.createCategory$(dto).subscribe({
      next: (response: CreateCategoryHttpResponse) => {
        console.log(response);
      },
      error: (exception: HttpCustomException) => {
        throw exception;
      },
      complete: () => {
        console.log('complete');
      },
    });
  }

  removeCategories() {
    const dto: RemoveCategoriesHttpRequest = {
      ids: this.selectedCategoryIds,
    };
    this.categoryService.removeCategories$(dto).subscribe();
    this.selectedCategoryIds = [];
    this.toggleSelectMode();
  }

  toggleSelection(event: MouseEvent, id: string) {
    event.stopPropagation();
    const index = this.selectedCategoryIds.indexOf(id);

    if (index === -1) {
      // Not currently selected, add to selection
      this.selectedCategoryIds.push(id);
    } else {
      // Currently selected, remove from selection
      this.selectedCategoryIds.splice(index, 1);
    }
  }

  toggleSelectMode() {
    this.isSelecting = !this.isSelecting;

    if (this.isSelecting) {
      this.selectedCategoryIds = [];
    }
  }

  deselectAll() {
    this.selectedCategoryIds = [];
  }

  onSubmit() {
    const dto = this.categoryForm.value;
    this.createCategory(dto);
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoryService
  ) {}
}
