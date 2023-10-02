import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@shared/constants/api.constant';
import { HttpCustomException } from '@shared/dtos';
import { ToastrCustomService } from '@shared/libraries/toastr';
import { createFormData } from '@shared/utils';
import {
  Observable,
  catchError,
  BehaviorSubject,
  first,
  tap,
  throwError,
} from 'rxjs';
import { ProductModel } from './product.interface';
import {
  CreateProductRequestDto,
  CreateProductResponseDto,
  GetProductResponseDto,
  GetProductsResponseDto,
  RemoveProductsRequestDto,
  RemoveProductsResponseDto,
  UpdateProductRequestDto,
  UpdateProductResponseDto,
} from './product.service.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly products = new BehaviorSubject<ProductModel[]>([]);

  get products$(): Observable<ProductModel[]> {
    return this.products;
  }

  getProducts$(): Observable<ProductModel[]> {
    // simulate server latency with 2 second delay
    return this.http
      .get<ProductModel[]>(
        ApiApplication.PRODUCT.CONTROLLER + ApiApplication.PRODUCT.GET_ALL,
        {},
      )
      .pipe(catchError(this.handleError));
  }

  setProducts$(products: ProductModel[]) {
    this.products.next(products);
  }

  getProduct$(id: string): Observable<GetProductResponseDto> {
    const url =
      ApiApplication.PRODUCT.CONTROLLER +
      ApiApplication.PRODUCT.GET_ONE.replace(':id', id);
    return this.http
      .get<GetProductResponseDto>(url)
      .pipe(catchError(this.handleError));
  }

  createProduct$(
    dto: CreateProductRequestDto,
  ): Observable<CreateProductResponseDto> {
    const formData = createFormData({
      dto,
    });

    const response$ = this.http.post<CreateProductResponseDto>(
      ApiApplication.PRODUCT.CONTROLLER + ApiApplication.PRODUCT.CREATE,
      formData,
    );

    return response$.pipe(
      first(),
      tap((response: CreateProductResponseDto) => {
        const newProduct = response;
        this.products.next([...this.products.value, newProduct]);
      }),
      catchError(this.handleError),
    );
  }

  removeProducts$(ids: string[]): Observable<RemoveProductsResponseDto> {
    const request: RemoveProductsRequestDto = {
      ids,
    };
    const productRemoving$ = this.http.post<RemoveProductsResponseDto>(
      ApiApplication.PRODUCT.CONTROLLER + ApiApplication.PRODUCT.DELETE_MANY,
      request,
    );

    return productRemoving$.pipe(
      tap((response: RemoveProductsResponseDto) => {
        const { ids: deletedIds } = response;
        this.products.next(
          this.products.value.filter(
            (product) => !deletedIds.includes(product.id!),
          ),
        );
        this.toast.success(response.message);
      }),

      catchError(this.handleError),
    );
  }

  updateProduct$(
    dto: UpdateProductRequestDto,
  ): Observable<UpdateProductResponseDto> {
    const formData = createFormData({
      dto,
    });
    const url =
      ApiApplication.PRODUCT.CONTROLLER +
      ApiApplication.PRODUCT.UPDATE.replace(':id', dto.id);

    return this.http.put<UpdateProductResponseDto>(url, formData);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new HttpCustomException(error));
  }

  constructor(
    private readonly http: HttpClient,
    private readonly toast: ToastrCustomService,
  ) {}
}
