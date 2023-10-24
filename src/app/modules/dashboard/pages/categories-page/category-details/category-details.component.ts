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
  ) {}
  category: CategoryRO;
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
          error.error.message.forEach((m: any) => {
            this.toast.error(m.error);
          });
          console.log(error);
        },
      });
  }
}
