import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCustomException } from '@shared/dtos';
import { ToastrCustomService } from '@shared/libraries/toastr';
import { createFormData } from '@shared/utils';
import { ToastrService } from 'ngx-toastr';
import {
  Observable,
  catchError,
  BehaviorSubject,
  first,
  tap,
  throwError,
  finalize,
} from 'rxjs';
import { Product } from './product.interface';
import {
  CreateProductRequestDto,
  CreateProductResponseDto,
  GetProductsResponseDto,
  RemoveProductsRequestDto,
  RemoveProductsResponseDto,
} from './product.service.dto';

@Injectable()
export class ProductService {
  // TODO: setup proxy later;
  url = 'http://localhost:3002/api/v1/products';
  createUrl = 'create';
  removeUrl = 'remove';
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
      tap((response: CreateProductResponseDto) => {
        const newProduct = response;
        this.products.next([...this.products.value, newProduct]);
        this.toast.success(response.message);
      }),
      catchError(this.handleError)
    );
  }

  removeProducts$(ids: string[]): Observable<RemoveProductsResponseDto> {
    const request: RemoveProductsRequestDto = {
      ids,
    };
    const productRemoving$ = this.http.post<RemoveProductsResponseDto>(
      `${this.url}/${this.removeUrl}`,
      request
    );

    return productRemoving$.pipe(
      tap((response: RemoveProductsResponseDto) => {
        const { ids: deletedIds } = response;
        this.products.next(
          this.products.value.filter(
            (product) => !deletedIds.includes(product.id!)
          )
        );
        this.toast.success(response.message);
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
