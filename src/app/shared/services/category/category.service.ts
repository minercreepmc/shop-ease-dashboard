import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@shared/constants/api.constant';
import { HttpCustomException } from '@shared/dtos';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import {
  CategoryModel,
  CreateCategoryDto,
  CreateCategoryResponse,
  DeleteCategoryResponse,
  UpdateCategoryResponse,
} from './category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private readonly http: HttpClient) {}
  private categories = new BehaviorSubject<CategoryModel[]>([]);

  get categories$() {
    return this.categories;
  }

  setCategories$(categories: CategoryModel[]) {
    this.categories.next(categories);
  }

  getCategories$(): Observable<CategoryModel[]> {
    return this.http
      .get<CategoryModel[]>(
        ApiApplication.CATEGORY.CONTROLLER + ApiApplication.CATEGORY.GET_ALL,
        {},
      )
      .pipe(catchError(this.handleError));
  }

  getCategory$(id: string): Observable<CategoryModel> {
    return this.http
      .get<CategoryModel>(
        ApiApplication.CATEGORY.CONTROLLER +
          ApiApplication.CATEGORY.GET_ONE.replace(':id', id),
        {},
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new HttpCustomException(error));
  }

  createCategory$(dto: CreateCategoryDto): Observable<CreateCategoryResponse> {
    return this.http
      .post<CreateCategoryResponse>(
        ApiApplication.CATEGORY.CONTROLLER + ApiApplication.CATEGORY.CREATE,
        dto,
      )
      .pipe(
        tap((response: CreateCategoryResponse) => {
          const newCategory = response;
          this.categories.next([...this.categories.value, newCategory]);
        }),
        catchError(this.handleError),
      );
  }

  removeCategory$(id: string): Observable<DeleteCategoryResponse> {
    return this.http
      .delete<DeleteCategoryResponse>(
        ApiApplication.CATEGORY.CONTROLLER +
          ApiApplication.CATEGORY.DELETE.replace(':id', id),
        {},
      )
      .pipe(
        tap((response: DeleteCategoryResponse) => {
          const id = response.id;
          this.categories.next(
            this.categories.value.filter((category) => category.id !== id),
          );
        }),
        catchError(this.handleError),
      );
  }

  updateCategory$(
    dto: UpdateCategoryResponse,
  ): Observable<UpdateCategoryResponse> {
    return this.http
      .put<UpdateCategoryResponse>(
        ApiApplication.CATEGORY.CONTROLLER +
          ApiApplication.CATEGORY.UPDATE.replace(':id', dto.id),
        dto,
      )
      .pipe(
        tap((response: UpdateCategoryResponse) => {
          const updatedCategory: CategoryModel = {
            ...response,
          };
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
