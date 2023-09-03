import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterModule } from '@angular/router';
import { DiscountModel } from '@shared/services/discount';

@Component({
  selector: 'app-discount-list',
  templateUrl: './discount-list.component.html',
  styleUrls: ['./discount-list.component.scss'],
  standalone: true,
  imports: [MatListModule, MatIconModule, NgFor, RouterModule],
})
export class DiscountListComponent {
  @Input() discounts: DiscountModel[] | null = [];
  selectedDiscountIds: string[] = [];
  isSelecting = false;

  toggleSelection(event: MouseEvent, id: string) {
    event.stopPropagation();
    const index = this.selectedDiscountIds.indexOf(id);

    if (index === -1) {
      // Not currently selected, add to selection
      this.selectedDiscountIds.push(id);
    } else {
      // Currently selected, remove from selection
      this.selectedDiscountIds.splice(index, 1);
    }
  }
}
