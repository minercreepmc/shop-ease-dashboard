import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CategoryModel } from '@shared/services/category';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  standalone: true,
  imports: [RouterModule, NgIf, MatListModule, NgFor, MatIconModule],
})
export class CategoryListComponent {
  @Input() categories: CategoryModel[] | null = [];
  selectedCategoryIds: string[] = [];
  isSelecting = false;

  toggleSelection(event: MouseEvent, id: string) {
    event.stopPropagation();
    const index = this.selectedCategoryIds.indexOf(id);

    if (index === -1) {
      // Not currently selected, add to selection
      this.selectedCategoryIds.push(id);
    } else {
      // Currently selected, remove from selection
      this.selectedCategoryIds.splice(index, 1);
    }
  }
}
