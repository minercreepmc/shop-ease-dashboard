import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-button',
  templateUrl: './product-button.component.html',
  styleUrls: ['./product-button.component.scss'],
})
export class ProductButtonComponent {
  faPlus = faPlus;
  faMinus = faMinus;
  @Input() contentVisibility = false;

  @Output() deleteButtonClicked = new EventEmitter();
  onDeleteButtonClicked() {
    this.deleteButtonClicked.emit();
  }

  @Output() importButtonClicked = new EventEmitter();
  onImportButtonClicked() {
    this.importButtonClicked.emit();
  }

  @Output() exportButtonClicked = new EventEmitter();
  onExportButtonClicked() {
    this.exportButtonClicked.emit();
  }

  @Output() toggleButtonClicked = new EventEmitter();
  onToggleButtonClicked() {
    this.toggleButtonClicked.emit();
  }
}
