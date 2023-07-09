import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCustomException } from '@shared/dtos';
import { ToastrCustomService } from '@shared/libraries/toastr';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import {
  Category,
  CreateCategoryHttpRequest,
  CreateCategoryHttpResponse,
  GetCategoriesHttpResponse,
} from './category.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = 'http://localhost:3002/api/v1/categories';
  private getUrl = 'get';
  private createUrl = 'create';
  private categories = new BehaviorSubject<Category[]>([]);

  get categories$(): Observable<Category[]> {
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
      .post<GetCategoriesHttpResponse>(`${this.url}/${this.getUrl}`, {})
      .pipe(catchError(this.handleError));
  }

  createCategory$(
    dto: CreateCategoryHttpRequest
  ): Observable<CreateCategoryHttpResponse> {
    console.log(dto);
    return this.http
      .post<CreateCategoryHttpResponse>(`${this.url}/${this.createUrl}`, dto)
      .pipe(
        tap((response: CreateCategoryHttpResponse) => {
          const newCategory = response;
          this.categories.next([...this.categories.value, newCategory]);
          this.toast.success(response.message!);
        }),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new HttpCustomException(error));
  }

  constructor(
    private readonly http: HttpClient,
    private readonly toast: ToastrCustomService
  ) {}
}
