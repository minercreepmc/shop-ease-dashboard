import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ToastrCustomService } from '@shared/libraries/toastr';
import { ProductModel } from '@model';
import { UpdateCategoryDto } from '@dto';
import { CategoryService } from '@service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductListComponent } from '@modules/dashboard/components/product-list/product-list.component';
import { CategoryRO } from '@ro';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@modules/dashboard/components';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    ProductListComponent,
  ],
})
export class CategoryDetailsComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: ToastrCustomService,
    private dialog: MatDialog,
  ) {}
  category: CategoryRO;
  products: ProductModel[];
  updateCategoryDto: UpdateCategoryDto;

  ngOnInit(): void {
    this.category = this.route.snapshot.data.category;
    this.updateCategoryDto = this.route.snapshot.data.category;
  }

  deleteCategory() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      enterAnimationDuration: '100ms',
      exitAnimationDuration: '100ms',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.deleteCategory$(this.category.id).subscribe({
          next: () => {
            this.toast.success('Xóa danh mục thành công');
            this.router.navigate(['/categories']);
          },
        });
      }
    });
  }

  onSubmit() {
    this.categoryService
      .updateCategory$(this.category.id, this.updateCategoryDto)
      .subscribe({
        next: () => {
          this.toast.success('Cập nhật danh mục thành công');
        },
        error: (error) => {
          error.error.message.forEach((m: any) => {
            this.toast.error(m.error);
          });
        },
      });
  }
}
