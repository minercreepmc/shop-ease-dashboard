import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpCustomException } from '@api/http';
import {
  CategoryModel,
  CategoryService,
  CreateCategoryDto,
  CreateCategoryResponse,
  DeleteCategoriesDto,
} from '@shared/services/category';
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
  categories: CategoryModel[] = [];
  categoryForm: FormGroup;
  selectedCategoryIds: string[] = [];
  isSelecting = false;

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: '',
    });
    this.categoryService.getCategories$().subscribe({
      next: (response: CategoryModel[]) => {
        this.categoryService.setCategories$(response);
      },
    });
    this.categoryService.categories$.subscribe((response) => {
      this.categories = response;
    });
  }

  createCategory(dto: CreateCategoryDto) {
    this.categoryService.createCategory$(dto).subscribe({
      next: (response: CreateCategoryResponse) => {
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
    const dto: DeleteCategoriesDto = {
      ids: this.selectedCategoryIds,
    };
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
    private readonly categoryService: CategoryService,
  ) {}
}
