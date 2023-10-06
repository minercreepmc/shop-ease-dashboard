import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { HttpCustomException } from '@shared/dtos';
import {
  ToastrCustomModule,
  ToastrCustomService,
} from '@shared/libraries/toastr';
import { ProductService } from '@service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CategoryModel } from '@model';
import { ActivatedRoute } from '@angular/router';
import { CreateProductDto, UploadFilesDto } from '@dto';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FileInput, MaterialFileInputModule } from 'ngx-material-file-input';
import { UploadService } from '@service/upload.service';
import { concatMap, map } from 'rxjs';
import { ProductImageService } from '@service/product-image.service';
import { HttpErrorResponse } from '@angular/common/http';

export interface IProductFormErrors {
  name: string;
  price: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MaterialFileInputModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    ToastrCustomModule,
    MatDialogModule,
  ],
})
export class ProductFormComponent implements OnInit {
  constructor(
    private readonly productService: ProductService,
    private readonly productImageService: ProductImageService,
    private readonly uploadService: UploadService,
    private readonly route: ActivatedRoute,
    private readonly toast: ToastrCustomService,
    private readonly dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateProductDto,
  ) {}

  fileInput: FileInput;
  createProduct = new CreateProductDto();
  uploadImageDto = new UploadFilesDto();
  categories: CategoryModel[] = [];
  faX = faX;

  ngOnInit() {
    this.categories = this.route.snapshot.data.categories;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // handleFileInput(event: Event) {
  //   const inputFile = event.target as HTMLInputElement;
  //   if (inputFile && inputFile.files && inputFile.files.length > 0) {
  //     const file = inputFile.files[0];
  //     this.productForm.patchValue({
  //       image: file,
  //     });
  //   }
  // }

  onSubmit() {
    if (this.fileInput) {
      this.uploadImageDto.files = this.fileInput.files;
    }
    this.createProductAndPublishImages().subscribe({
      next: () => {
        this.toast.success('Product created successfully');
      },
      error: (e: HttpErrorResponse) => {
        e.error.message.forEach((m: any) => {
            this.toast.error(m.error);
        });
        console.log(e);
      },
      complete: () => {
        console.log('complete');
        this.dialogRef.close();
      },
    });
  }

  createProductAndPublishImages() {
    // return this.uploadService.uploadMultiple(this.uploadImageDto).pipe(
    //   mergeMap((imageUrls) => {
    //     this.createProduct.imageUrls = imageUrls;
    //     return this.productService.createProduct$(this.createProduct);
    //   }),
    // );

    return this.productService.createProduct$(this.createProduct).pipe(
      concatMap((product) => {
        return this.uploadService
          .uploadMultiple(this.uploadImageDto)
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

  @Output() closeButtonClicked = new EventEmitter();
  onCloseButtonClicked() {
    this.closeButtonClicked.emit();
  }
}
