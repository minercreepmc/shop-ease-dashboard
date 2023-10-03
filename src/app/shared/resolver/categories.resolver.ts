import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CategoryModel } from '@model';
import { CategoryService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesResolver implements Resolve<CategoryModel[]> {
  constructor(private readonly categoryService: CategoryService) {}
  resolve(): Observable<CategoryModel[]> {
    this.categoryService.getCategories$().subscribe({
      next: (categorieses) => {
        this.categoryService.setCategories$(categorieses);
      },
    });
    return this.categoryService.categories$;
  }
}
