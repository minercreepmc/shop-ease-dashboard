import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faX } from '@fortawesome/free-solid-svg-icons';
import {
  CategoryService,
  CreateCategoryHttpRequest,
} from '@shared/services/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  faX = faX;

  ngOnInit() {
    this.categoryForm = this.fb.group({
      name: '',
      description: '',
    });
  }

  @Output() closeButtonClicked = new EventEmitter();
  onCloseButtonClicked() {
    this.closeButtonClicked.emit();
  }

  onCategorySubmit() {
    const dto = this.categoryForm.value;
    this.createCategory(dto);
    this.categoryForm.reset();
  }

  createCategory(dto: CreateCategoryHttpRequest) {
    this.categoryService.createCategory$(dto).subscribe();
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly categoryService: CategoryService
  ) {}
}
