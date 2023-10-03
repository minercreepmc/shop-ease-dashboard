import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductModel } from '@model';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
  standalone: true,
  imports: [MatTableModule, CommonModule, FormsModule, RouterLink],
})
export class ProductsTableComponent {
  displayedColumns: string[] = ['select', 'name', 'image', 'price'];
  @Input() products: ProductModel[] = [] as ProductModel[];
  @Input() editMode = false;
  @Input() highlightIds: string[] = [];

  @Output() selectedProductIdsChange = new EventEmitter<string[]>();

  selectedProductIds: string[] = [];

  onToggleCheckbox(productId: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      // Add the product's id to the selectedProducts array if it's not already included
      if (!this.selectedProductIds.includes(productId)) {
        this.selectedProductIds.push(productId);
      }
    } else {
      // Remove the product's id from the selectedProducts array if it's checked off
      this.selectedProductIds = this.selectedProductIds.filter(
        (id) => id !== productId,
      );
    }
    // Emit the updated selectedProductIds array to the parent component
    this.selectedProductIdsChange.emit(this.selectedProductIds);
  }
}
