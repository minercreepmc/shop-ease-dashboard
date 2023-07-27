import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category-button',
  templateUrl: './category-button.component.html',
  styleUrls: ['./category-button.component.scss'],
})
export class CategoryButtonComponent {
  faPlus = faPlus;
  faMinus = faMinus;
  @Input() isToggleButtonVisible = false;
  @Output() toggleButtonClicked = new EventEmitter();
  onToggleButtonClicked() {
    this.toggleButtonClicked.emit();
  }

  @Output() removeButtonClicked = new EventEmitter();
  onRemoveButtonClicked() {
    this.removeButtonClicked.emit();
  }

  @Input() isRemoveButtonVisible = false;

  @Input() isDeselectButtonVisible = false;
  @Output() deselectButtonClicked = new EventEmitter();
  onDeselectButtonClicked() {
    this.deselectButtonClicked.emit();
  }

  @Input() isDisableSelectionButtonVisible = false;
  @Output() disableSelectionButtonClicked = new EventEmitter();
  onDisableSelectionButtonClicked() {
    this.disableSelectionButtonClicked.emit();
  }

  @Input() isEnableSelectionButtonVisible = false;
  @Output() enableSelectionButtonClicked = new EventEmitter();
  onEnableSelectionButtonClicked() {
    this.enableSelectionButtonClicked.emit();
  }
}
