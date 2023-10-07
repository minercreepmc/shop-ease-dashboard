import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import { CreateProductDto, DeleteProductDtostos, UpdateProductDto } from '@dto';
import { ProductModel } from '@model';
import {
  CreateProductRO,
  GetAllProductWithImagesRO,
  ProductRO,
  UpdateProductRO,
} from '@ro';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private readonly http: HttpClient) {}
  readonly products = new BehaviorSubject<ProductModel[]>([]);

  get products$(): BehaviorSubject<ProductModel[]> {
    return this.products;
  }

  getProducts$(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(
      ApiApplication.PRODUCT.CONTROLLER + '/' + ApiApplication.PRODUCT.GET_ALL,
    );
  }

  getProductsWithImages$(): Observable<GetAllProductWithImagesRO[]> {
    return this.http.post<GetAllProductWithImagesRO[]>(
      ApiApplication.PRODUCT.CONTROLLER +
        '/' +
        ApiApplication.PRODUCT.GET_ALL_WITH_IMAGES,
      {},
    );
  }

  setProducts$(products: ProductModel[]) {
    this.products.next(products);
  }

  getProduct$(id: string): Observable<ProductRO> {
    return this.http.get<ProductRO>(
      ApiApplication.PRODUCT.CONTROLLER +
        '/' +
        ApiApplication.PRODUCT.GET_ONE.replace(':id', id),
    );
  }

  createProduct$(dto: CreateProductDto): Observable<CreateProductRO> {
    const productCreating$ = this.http.post<CreateProductRO>(
      ApiApplication.PRODUCT.CONTROLLER + '/' + ApiApplication.PRODUCT.CREATE,
      dto,
    );

    return productCreating$.pipe(
      tap((product: CreateProductRO) => {
        this.products.next([...this.products.value, product]);
      }),
    );
  }

  deleteProduct$(id: string): Observable<ProductModel> {
    return this.http
      .delete<ProductModel>(
        ApiApplication.PRODUCT.CONTROLLER +
          '/' +
          ApiApplication.PRODUCT.DELETE.replace(':id', id),
      )
      .pipe(
        tap((response: ProductModel) => {
          this.products.next(
            this.products.value.filter((product) => product.id !== response.id),
          );
        }),
      );
  }

  deleteProducts$(ids: string[]): Observable<string[]> {
    const request: DeleteProductDtostos = {
      ids,
    };
    const productDeleting$ = this.http.post<string[]>(
      ApiApplication.PRODUCT.CONTROLLER + ApiApplication.PRODUCT.DELETE_MANY,
      request,
    );

    return productDeleting$.pipe(
      tap((deletedIds: string[]) => {
        this.products.next(
          this.products.value.filter(
            (product) => !deletedIds.includes(product.id),
          ),
        );
      }),
    );
  }

  updateProduct$(
    id: string,
    dto: UpdateProductDto,
  ): Observable<UpdateProductRO> {
    return this.http.put<UpdateProductRO>(
      ApiApplication.PRODUCT.CONTROLLER +
        '/' +
        ApiApplication.PRODUCT.UPDATE.replace(':id', id),
      dto,
    );
  }
}
