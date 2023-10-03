import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { CategoryModel } from '@model';
import { CategoryService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryResolver implements Resolve<CategoryModel> {
  constructor(private readonly categoryService: CategoryService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<CategoryModel> {
    const id = route.paramMap.get('id');
    return this.categoryService.getCategory$(id!);
  }
}
