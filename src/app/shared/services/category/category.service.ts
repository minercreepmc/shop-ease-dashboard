import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  v1ApiEndpoints,
  V1GetCategoryHttpQuery,
  V1GetCategoryHttpResponse,
} from '@api/http';
import { HttpCustomException } from '@shared/dtos';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import {
  CategoryModel,
  CreateCategoryHttpRequest,
  CreateCategoryHttpResponse,
  GetCategoriesHttpResponse,
  RemoveCategoriesHttpRequest,
  RemoveCategoriesHttpResponse,
  UpdateCategoryHttpRequest,
  UpdateCategoryHttpResponse,
} from './category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private getAllUrl = v1ApiEndpoints.getCategories;
  private getCategoryUrl = v1ApiEndpoints.getCategory;
  private createUrl = v1ApiEndpoints.createCategory;
  private removeUrl = v1ApiEndpoints.removeCategories;
  private updateUrl = v1ApiEndpoints.updateCategory;

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

  getCategory$(id: string): Observable<V1GetCategoryHttpResponse> {
    const url = this.getCategoryUrl.replace(':id', id);

    return this.http
      .get<CategoryModel>(url, {})
      .pipe(catchError(this.handleError));
  }

  getCategoryWithProducts$(id: string): Observable<V1GetCategoryHttpResponse> {
    const url = this.getCategoryUrl.replace(':id', id);

    const query: V1GetCategoryHttpQuery = {
      populate_products: true,
    };

    return this.http.get<V1GetCategoryHttpResponse>(url, {
      params: query as HttpParams,
    });
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

  updateCategory$(
    dto: UpdateCategoryHttpRequest
  ): Observable<UpdateCategoryHttpResponse> {
    const url = this.updateUrl.replace(':id', dto.id);
    return this.http.put<UpdateCategoryHttpResponse>(url, dto).pipe(
      tap((response: UpdateCategoryHttpResponse) => {
        const updatedCategory: CategoryModel = {
          ...response,
        };
        this.categories.next(
          this.categories.value.map((category) => {
            if (category.id === updatedCategory.id) {
              return updatedCategory;
            }
            return category;
          })
        );
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new HttpCustomException(error));
  }

  constructor(private readonly http: HttpClient) {}
}
