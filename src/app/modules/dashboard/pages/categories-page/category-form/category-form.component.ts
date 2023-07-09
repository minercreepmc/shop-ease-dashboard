import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  faX = faX;

  // Emitting the new category created for the parent component to use.
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
    });
  }

  @Output() closeButtonClicked = new EventEmitter();
  onCloseButtonClicked() {
    this.closeButtonClicked.emit();
  }

  onCategorySubmit() {
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.value);
    }
  }
}
