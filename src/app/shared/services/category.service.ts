import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import { CreateCategoryDto, UpdateCategoryDto } from '@dto';
import { CategoryModel } from '@model';
import { CategoryIncludeProductCountRO } from '@ro';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private readonly http: HttpClient) {}
  private categories = new BehaviorSubject<any[]>([]);

  get categories$() {
    return this.categories;
  }

  setCategories$(categories: any[]) {
    this.categories.next(categories);
  }

  getCategories$(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(
      ApiApplication.CATEGORY.CONTROLLER +
        '/' +
        ApiApplication.CATEGORY.GET_ALL,
      {},
    );
  }

  getCategoriesWithCount$(): Observable<CategoryIncludeProductCountRO[]> {
    return this.http.post<CategoryIncludeProductCountRO[]>(
      ApiApplication.CATEGORY.CONTROLLER +
        '/' +
        ApiApplication.CATEGORY.GET_ALL_WITH_PRODUCT_COUNT,
      {},
    );
  }

  getCategory$(id: string): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(
      ApiApplication.CATEGORY.CONTROLLER +
        '/' +
        ApiApplication.CATEGORY.GET_ONE.replace(':id', id),
      {},
    );
  }

  createCategory$(dto: CreateCategoryDto): Observable<CategoryModel> {
    return this.http
      .post<CategoryModel>(
        ApiApplication.CATEGORY.CONTROLLER +
          '/' +
          ApiApplication.CATEGORY.CREATE,
        dto,
      )
      .pipe(
        tap((category: CategoryModel) => {
          this.categories.next([...this.categories.value, category]);
        }),
      );
  }

  deleteCategory$(id: string): Observable<CategoryModel> {
    return this.http
      .delete<CategoryModel>(
        ApiApplication.CATEGORY.CONTROLLER +
          '/' +
          ApiApplication.CATEGORY.DELETE.replace(':id', id),
        {},
      )
      .pipe(
        tap((category: CategoryModel) => {
          const id = category.id;
          this.categories.next(
            this.categories.value.filter((category) => category.id !== id),
          );
        }),
      );
  }

  updateCategory$(
    id: string,
    dto: UpdateCategoryDto,
  ): Observable<CategoryModel> {
    return this.http
      .put<CategoryModel>(
        ApiApplication.CATEGORY.CONTROLLER +
          '/' +
          ApiApplication.CATEGORY.UPDATE.replace(':id', id),
        dto,
      )
      .pipe(
        tap((updatedCategory: CategoryModel) => {
          this.categories.next(
            this.categories.value.map((category) => {
              if (category.id === updatedCategory.id) {
                return updatedCategory;
              }
              return category;
            }),
          );
        }),
      );
  }
}
