import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpCustomException } from '@shared/dtos';
import { Category, CreateCategoryHttpRequest } from '@shared/services/category';
import { CategoryService } from '@shared/services/category/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  faPlus = faPlus;
  faMinus = faMinus;

  categories$: Observable<Category[]>;
  addCategoryFormVisible = false;
  categoryForm: FormGroup;
  selectedCategories: string[] = [];
  isCategoryFormVisible = false;
  isSelecting = false;

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: '',
    });
    this.categoryService.loadCategories$().subscribe();
    this.categories$ = this.categoryService.categories$;
  }

  toggleAddCategoryForm() {
    this.isCategoryFormVisible = !this.isCategoryFormVisible;
    console.log(this.isCategoryFormVisible);
  }

  toggleSelection(event: MouseEvent, id: string) {
    event.stopPropagation();
    const index = this.selectedCategories.indexOf(id);

    if (index === -1) {
      // Not currently selected, add to selection
      this.selectedCategories.push(id);
    } else {
      // Currently selected, remove from selection
      this.selectedCategories.splice(index, 1);
    }
  }

  toggleSelectMode() {
    this.isSelecting = !this.isSelecting;

    if (this.isSelecting) {
      this.selectedCategories = [];
    }
  }

  deselectAll() {
    this.selectedCategories = [];
  }

  toggleAddCategory(event: MouseEvent): void {
    event.stopPropagation(); // Stop the event from bubbling up to the document
    this.addCategoryFormVisible = !this.addCategoryFormVisible;
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent): void {
    let targetElement = event.target as HTMLElement;
    while (targetElement != null) {
      if (
        targetElement.classList.contains('category-delete-confirm-cancel') ||
        targetElement.classList.contains('category-add-form') ||
        targetElement.classList.contains('category-confirm-button') ||
        targetElement.classList.contains('category-cancel-button')
      ) {
        return;
      }
      targetElement = targetElement.parentElement!;
    }
    this.addCategoryFormVisible = false;
  }

  onSubmit() {
    const dto = this.categoryForm.value;
    this.createCategory(dto);
  }

  createCategory(dto: CreateCategoryHttpRequest) {
    this.categoryService.createCategory$(dto).subscribe({
      next: (response) => {
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

  deleteCategory() {
    console.log(this.selectedCategories);
    this.selectedCategories = [];
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoryService
  ) {}
}
