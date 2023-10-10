import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute } from '@angular/router';
import { UserRole } from '@constant';
import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, CategoryListComponent, MatButtonModule],
})
export class CategoriesPageComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
  ) {}

  role: string;

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.role = data.profile.role;
    });
  }

  isAdmin() {
    return this.role === UserRole.ADMIN;
  }

  openDialog() {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      data: {},
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
}
