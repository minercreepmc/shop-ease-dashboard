import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCustomException } from '@shared/dtos';
import { createFormData } from '@shared/utils';
import {
  Observable,
  catchError,
  BehaviorSubject,
  first,
  tap,
  throwError,
} from 'rxjs';
import { Product } from './product.interface';
import {
  CreateProductRequestDto,
  CreateProductResponseDto,
  GetProductsResponseDto,
} from './product.service.dto';

@Injectable()
export class ProductService {
  // TODO: setup proxy later;
  url = 'http://localhost:3002/api/v1/products';
  createUrl = 'create';
  getUrl = 'get';

  readonly products = new BehaviorSubject<Product[]>([]);

  get products$(): Observable<Product[]> {
    return this.products.asObservable();
  }

  loadProducts$(): Observable<GetProductsResponseDto> {
    const productGetting$ = this.getProducts$().pipe(
      tap((response: GetProductsResponseDto) =>
        this.products.next(response.products)
      )
    );

    return productGetting$;
  }

  getProducts$(): Observable<GetProductsResponseDto> {
    // simulate server latency with 2 second delay
    return this.http
      .post<GetProductsResponseDto>(`${this.url}/${this.getUrl}`, {})
      .pipe(catchError(this.handleError));
  }

  createProduct$(
    dto: CreateProductRequestDto
  ): Observable<CreateProductResponseDto> {
    const formData = createFormData({
      dto,
      nestedKeys: ['price'],
    });

    const response$ = this.http.post<CreateProductResponseDto>(
      `${this.url}/${this.createUrl}`,
      formData
    );

    return response$.pipe(
      first(),
      tap((newProduct: CreateProductResponseDto) => {
        this.products.next([...this.products.value, newProduct]);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new HttpCustomException(error));
  }

  constructor(private readonly http: HttpClient) {}
}
