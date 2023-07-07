import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-form-page',
  templateUrl: './dashboard-form-page.component.html',
  styleUrls: ['./dashboard-form-page.component.scss'],
})
export class DashboardFormPageComponent {
  isProductFormVisible = false;
  isCategoryFormVisible = false;

  handleProductFormVisibility = () => {
    this.isProductFormVisible = !this.isProductFormVisible;
    if (this.isCategoryFormVisible) {
      // If Category form is open, close it
      this.isCategoryFormVisible = false;
    }
  };

  handleCategoryFormVisibility = () => {
    this.isCategoryFormVisible = !this.isCategoryFormVisible;
    if (this.isProductFormVisible) {
      // If Product form is open, close it
      this.isProductFormVisible = false;
    }
  };

  handleCloseButtonClicked = () => {
    // Handle the logic when the close button is clicked
    this.isProductFormVisible = false;
    this.isCategoryFormVisible = false;
  };
}
