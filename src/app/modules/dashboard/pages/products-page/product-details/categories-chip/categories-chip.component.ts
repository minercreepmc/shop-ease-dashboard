import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatLegacyChipsModule,
  MatLegacyChipInputEvent,
} from '@angular/material/legacy-chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { CategoryModel, CategoryService } from '@shared/services/category';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-categories-chip',
  templateUrl: './categories-chip.component.html',
  styleUrls: ['./categories-chip.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatLegacyChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class CategoriesChipComponent implements OnInit {
  constructor(private readonly categoryService: CategoryService) {}
  public allCategories: CategoryModel[] = [];
  @Input() chipSelectedCategories: CategoryModel[] = [];
  @Output() chipSelectedCategoriesChange = new EventEmitter<CategoryModel[]>();
  public filteredCategories: Observable<string[]>;

  //
  // Set this to false to ensure categories are from allCategories list only.
  // Set this to true to also allow 'free text' categories.
  //
  private allowFreeTextAddCategory = false;

  public categoryControl = new FormControl();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  ngOnInit() {
    this.categoryService.getCategories$().subscribe({
      next: (response) => {
        this.allCategories = response.categories;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.filteredCategories = this.categoryControl.valueChanges.pipe(
      startWith(null),
      map((categoryName) => this.filterOnValueChange(categoryName))
    );
  }

  public addCategory(event: MatLegacyChipInputEvent): void {
    if (!this.allowFreeTextAddCategory) {
      // only allowed to select from the filtered autocomplete list
      console.log('allowFreeTextAddCategory is false');
      return;
    }

    //
    // Only add when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    //
    if (this.matAutocomplete.isOpen) {
      return;
    }

    // Add our category
    const value = event.value;
    if ((value || '').trim()) {
      this.selectCategoryByName(value.trim());
    }

    this.resetInputs();
  }

  public removeCategory(category: CategoryModel): void {
    const index = this.chipSelectedCategories.indexOf(category);
    if (index >= 0) {
      this.chipSelectedCategories.splice(index, 1);
      this.resetInputs();
    }
    this.chipSelectedCategoriesChange.emit(this.chipSelectedCategories);
  }

  public categorySelected(event: MatAutocompleteSelectedEvent): void {
    this.selectCategoryByName(event.option.value);
    this.resetInputs();
  }

  private resetInputs() {
    // clear input element
    this.categoryInput.nativeElement.value = '';
    // clear control value and trigger categoryControl.valueChanges event
    this.categoryControl.setValue(null);
  }

  //
  // Compute a new autocomplete list each time control value changes
  //
  private filterOnValueChange(categoryName: string | null): string[] {
    let result: string[] = [];
    //
    // Remove the categories we have already selected from all categories to
    // get a starting point for the autocomplete list.
    //
    const allCategoriesLessSelected = this.allCategories.filter(
      (category) => this.chipSelectedCategories.indexOf(category) < 0
    );
    if (categoryName) {
      result = this.filterCategory(allCategoriesLessSelected, categoryName);
    } else {
      result = allCategoriesLessSelected.map((category) => category.name);
    }
    return result;
  }

  private filterCategory(
    categoryList: CategoryModel[],
    categoryName: string
  ): string[] {
    let filteredCategoryList: CategoryModel[] = [];
    const filterValue = categoryName.toLowerCase();
    const categoriesMatchingCategoryName = categoryList.filter(
      (category) => category.name.toLowerCase().indexOf(filterValue) === 0
    );
    if (
      categoriesMatchingCategoryName.length ||
      this.allowFreeTextAddCategory
    ) {
      //
      // either the category name matched some autocomplete options
      // or the name didn't match but we're allowing
      // non-autocomplete category names to be entered
      //
      filteredCategoryList = categoriesMatchingCategoryName;
    } else {
      //
      // the category name didn't match the autocomplete list
      // and we're only allowing categories to be selected from the list
      // so we show the whjole list
      //
      filteredCategoryList = categoryList;
    }
    //
    // Convert filtered list of category objects to list of category
    // name strings and return it
    //
    return filteredCategoryList.map((category) => category.name);
  }

  private selectCategoryByName(categoryName: string) {
    const foundCategory = this.allCategories.filter(
      (category) => category.name == categoryName
    );
    if (foundCategory.length) {
      //
      // We found the category name in the allCategories list
      //
      this.chipSelectedCategories.push(foundCategory[0]);
    } else {
      //
      // Create a new category, assigning a new higher employeeId
      // This is the use case when allowFreeTextAddCategory is true
      //
      this.chipSelectedCategories.push({
        name: categoryName,
        id: uuid(),
      });
    }
    this.chipSelectedCategoriesChange.emit(this.chipSelectedCategories);
  }
}
