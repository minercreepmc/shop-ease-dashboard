import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ProductsTableComponent } from '@modules/dashboard/components/products-table/products-table.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ToastrCustomService } from '@shared/libraries/toastr';
import { CategoryModel, ProductModel } from '@model';
import { UpdateCategoryDto } from '@dto';
import { CategoryService } from '@service';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    NgIf,
    NgFor,
    NgClass,
    AsyncPipe,
    ProductsTableComponent,
    MatTooltipModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class CategoryDetailsComponent implements OnInit {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly toast: ToastrCustomService,
  ) {}
  category: CategoryModel;
  products: ProductModel[];
  updateCategoryDto: UpdateCategoryDto;
  id: string;

  ngOnInit(): void {
    this.category = this.route.snapshot.data.category;
    this.updateCategoryDto = this.route.snapshot.data.category;
  }

  deleteCategory() {
    return this.categoryService.deleteCategory$(this.id).subscribe({
      next: () => {
        this.router.navigate(['/categories']);
      },
    });
  }

  onSubmit() {
    this.categoryService
      .updateCategory$(this.category.id, this.updateCategoryDto)
      .subscribe({
        next: () => {
          this.toast.success('Category updated successfully');
        },
        error: (error) => {
          this.toast.error(error.message);
        },
      });
  }
}
