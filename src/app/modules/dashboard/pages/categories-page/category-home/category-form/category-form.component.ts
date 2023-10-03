import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateCategoryDto } from '@dto';
import { CategoryService } from '@service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class CategoryFormComponent {
  constructor(private readonly categoryService: CategoryService) {}
  createCategoryDto: CreateCategoryDto;

  @Output() closeButtonClicked = new EventEmitter();
  onCloseButtonClicked() {
    this.closeButtonClicked.emit();
  }

  onCategorySubmit() {
    this.categoryService.createCategory$(this.createCategoryDto).subscribe();
  }
}
