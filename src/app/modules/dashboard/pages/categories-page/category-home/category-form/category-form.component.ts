import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  CategoryService,
  CreateCategoryHttpRequest,
} from '@shared/services/category';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;

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
    console.log(dto);
    this.categoryService.createCategory$(dto).subscribe();
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly categoryService: CategoryService
  ) {}
}
