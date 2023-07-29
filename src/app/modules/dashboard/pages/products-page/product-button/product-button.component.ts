import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { PrimaryButtonComponent } from '@shared/components/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '@shared/components/secondary-button/secondary-button.component';
import { ToggleButtonComponent } from '@shared/components/toggle-button/toggle-button.component';

@Component({
  selector: 'app-product-button',
  templateUrl: './product-button.component.html',
  styleUrls: ['./product-button.component.scss'],
  standalone: true,
  imports: [
    PrimaryButtonComponent,
    SecondaryButtonComponent,
    CommonModule,
    ToggleButtonComponent,
  ],
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
