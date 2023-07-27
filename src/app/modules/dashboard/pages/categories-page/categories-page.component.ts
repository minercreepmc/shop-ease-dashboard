import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { HttpCustomException } from '@shared/dtos';
import {
  CategoryModel,
  CategoryService,
  CreateCategoryHttpRequest,
  CreateCategoryHttpResponse,
  RemoveCategoriesHttpRequest,
} from '@shared/services/category';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent implements OnInit {
  faPlus = faPlus;
  faMinus = faMinus;

  categories$: Observable<CategoryModel[]>;
  addCategoryFormVisible = false;
  categoryForm: FormGroup;
  selectedCategoryIds: string[] = [];
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

  toggleAddCategory(event: MouseEvent): void {
    event.stopPropagation(); // Stop the event from bubbling up to the document
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

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly categoryService: CategoryService
  ) {}
}
