import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CreateCategoryDto } from '@dto';
import { CategoryService } from '@service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrCustomService } from '@shared/libraries/toastr';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
})
export class CategoryFormComponent {
  constructor(
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<CategoryFormComponent>,
    private toast: ToastrCustomService,
  ) {}
  createCategoryDto = new CreateCategoryDto();

  onCategorySubmit() {
    this.categoryService.createCategory$(this.createCategoryDto).subscribe({
      error: (e) => {
        e.error.message.forEach((m: any) => {
          this.toast.error(m.error);
        });
        console.log(e);
      },
      complete: () => {
        this.dialogRef.close();
      },
    });
  }
}
