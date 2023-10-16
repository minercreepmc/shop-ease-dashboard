import { NgFor } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { UpdateProductDto, UploadFilesDto } from '@dto';
import { CategoryModel, DiscountModel } from '@model';
import { ProductRO } from '@ro';
import { ProductService, UploadService } from '@service';
import { ProductImageService } from '@service/product-image.service';
import { ToastrCustomService } from '@shared/libraries/toastr';
import { FileInput, MaterialFileInputModule } from 'ngx-material-file-input';
import { concatMap, map } from 'rxjs';

@Component({
  selector: 'app-product-update-form',
  templateUrl: './product-update-form.component.html',
  styleUrls: ['./product-update-form.component.scss'],
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    MatButtonModule,
    FormsModule,
    MaterialFileInputModule,
    MatIconModule,
  ],
})
export class ProductUpdateFormComponent {
  constructor(
    private productSerivce: ProductService,
    private uploadService: UploadService,
    private toast: ToastrCustomService,
    private productImageService: ProductImageService,
  ) {}
  @Input() product: ProductRO;
  @Input() discounts: DiscountModel[];
  @Input() categories: CategoryModel[];
  updateProductDto = new UpdateProductDto();
  fileInput: FileInput;
  uploadImageDto = new UploadFilesDto();

  onSubmit() {
    if (this.fileInput) {
      this.uploadImageDto.files = this.fileInput.files;
    }

    this.updateProduct$(
      this.product.id,
      this.updateProductDto,
      this.uploadImageDto,
    ).subscribe({
      next: () => {
        this.toast.success('Update product successfully');
      },
      error: (e: HttpErrorResponse) => {
        e.error.message.forEach((m: any) => {
          this.toast.error(m.error);
        });
        console.log(e);
      },
      complete: () => {
        window.location.reload();
      },
    });
  }

  updateProduct$(id: string, dto: UpdateProductDto, imageDto: UploadFilesDto) {
    return this.productSerivce.updateProduct$(id, dto).pipe(
      concatMap((product) => {
        return this.uploadService
          .uploadMultiple(imageDto)
          .pipe(map((imageUrls) => ({ product, imageUrls })));
      }),
      concatMap(({ product, imageUrls }) => {
        return this.productImageService
          .addImages$({
            productId: product.id,
            urls: imageUrls,
          })
          .pipe(map(() => ({ product, imageUrls })));
      }),
    );
  }

  onNameChange($event: any) {
    this.updateProductDto.name = $event.target.value;
  }

  onDescriptionChange($event: any) {
    this.updateProductDto.description = $event.target.value;
  }

  onPriceChange($event: any) {
    this.updateProductDto.price = $event.target.value;
  }

  onDiscountChange($event: MatSelectChange) {
    this.updateProductDto.discountId = $event.value;
  }

  onCategoriesChange($event: MatSelectChange) {
    this.updateProductDto.categoryIds = $event.value;
  }
}
