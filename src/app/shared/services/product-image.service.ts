import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import { AddImageUrlsDto } from '@dto';
import { ProductImageModel } from '@model';

@Injectable({
  providedIn: 'root',
})
export class ProductImageService {
  constructor(private readonly http: HttpClient) {}

  addImages$(dto: AddImageUrlsDto) {
    return this.http.post<ProductImageModel[]>(
      ApiApplication.PRODUCT_IMAGE.CONTROLLER +
        '/' +
        ApiApplication.PRODUCT_IMAGE.ADD,
      dto,
    );
  }
}
