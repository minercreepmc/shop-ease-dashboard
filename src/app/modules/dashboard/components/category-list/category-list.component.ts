import { Component, Input } from '@angular/core';
import { CategoryModel } from '@shared/services/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent {
  @Input() categories: CategoryModel[];
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
