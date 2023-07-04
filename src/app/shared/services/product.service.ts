import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCustomException } from '@shared/dtos';
import { createFormData } from '@shared/utils';
import { Observable, catchError } from 'rxjs';
import {
  CreateProductRequestDto,
  CreateProductResponseDto,
} from './product.service.dto';

@Injectable()
export class ProductService {
  // TODO: setup proxy later;
  url = 'http://localhost:3002/api/v1/products';

  createProduct(
    dto: CreateProductRequestDto
  ): Observable<CreateProductResponseDto> {
    const formData = createFormData({
      dto,
      nestedKeys: ['price'],
    });
    return this.http.post<CreateProductResponseDto>(this.url, formData).pipe(
      catchError((error) => {
        throw new HttpCustomException(error);
      })
    );
  }

  constructor(private readonly http: HttpClient) {}
}
