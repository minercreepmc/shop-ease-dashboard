import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-category-button',
  templateUrl: './category-button.component.html',
  styleUrls: ['./category-button.component.scss'],
})
export class CategoryButtonComponent {
  @Output() deleteButtonClicked = new EventEmitter();
  onDeleteButtonClicked() {
    this.deleteButtonClicked.emit();
  }

  @Output() deselectButtonClicked = new EventEmitter();
  onDeselectButtonClicked() {
    this.deselectButtonClicked.emit();
  }
}
