import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { v1ApiEndpoints } from '@api/http';
import { HttpCustomException } from '@shared/dtos';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import {
  CategoryModel,
  CreateCategoryHttpRequest,
  CreateCategoryHttpResponse,
  GetCategoriesHttpResponse,
  RemoveCategoriesHttpRequest,
  RemoveCategoriesHttpResponse,
} from './category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private getAllUrl = v1ApiEndpoints.getCategories;
  private createUrl = v1ApiEndpoints.createCategory;
  private removeUrl = v1ApiEndpoints.removeCategories;

  private categories = new BehaviorSubject<CategoryModel[]>([]);

  get categories$(): Observable<CategoryModel[]> {
    return this.categories.asObservable();
  }

  loadCategories$(): Observable<GetCategoriesHttpResponse> {
    const categoryGetting$ = this.getCategories$().pipe(
      tap((response: GetCategoriesHttpResponse) =>
        this.categories.next(response.categories)
      ),
      catchError(this.handleError)
    );

    return categoryGetting$;
  }

  getCategories$(): Observable<GetCategoriesHttpResponse> {
    return this.http
      .get<GetCategoriesHttpResponse>(this.getAllUrl, {})
      .pipe(catchError(this.handleError));
  }

  createCategory$(
    dto: CreateCategoryHttpRequest
  ): Observable<CreateCategoryHttpResponse> {
    return this.http.post<CreateCategoryHttpResponse>(this.createUrl, dto).pipe(
      tap((response: CreateCategoryHttpResponse) => {
        const newCategory = response;
        this.categories.next([...this.categories.value, newCategory]);
      }),
      catchError(this.handleError)
    );
  }

  removeCategories$(
    dto: RemoveCategoriesHttpRequest
  ): Observable<RemoveCategoriesHttpResponse> {
    return this.http
      .post<RemoveCategoriesHttpResponse>(this.removeUrl, dto)
      .pipe(
        tap((response: RemoveCategoriesHttpResponse) => {
          if (response) {
            const { ids } = response;
            this.categories.next(
              this.categories.value.filter(
                (category) => !ids.includes(category.id)
              )
            );
          }
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new HttpCustomException(error));
  }

  constructor(private readonly http: HttpClient) {}
}
