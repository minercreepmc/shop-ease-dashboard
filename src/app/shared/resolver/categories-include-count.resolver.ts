import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CategoryIncludeProductCountRO } from '@ro';
import { CategoryService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesIncludeCountResolver
  implements Resolve<CategoryIncludeProductCountRO[]>
{
  constructor(private readonly categoryService: CategoryService) {}
  resolve(): Observable<CategoryIncludeProductCountRO[]> {
    this.categoryService.getCategoriesWithCount$().subscribe({
      next: (categories) => {
        console.log(categories);
        this.categoryService.setCategories$(categories);
      },
    });
    return this.categoryService.categories$;
  }
}
