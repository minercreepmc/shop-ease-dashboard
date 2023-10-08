import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { faX } from '@fortawesome/free-solid-svg-icons';
import {
  ToastrCustomModule,
  ToastrCustomService,
} from '@shared/libraries/toastr';
import { CategoryService, DiscountService, ProductService } from '@service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CategoryModel, DiscountModel } from '@model';
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
    private productService: ProductService,
    private productImageService: ProductImageService,
    private categoryService: CategoryService,
    private discountService: DiscountService,
    private uploadService: UploadService,
    private route: ActivatedRoute,
    private toast: ToastrCustomService,
    private dialogRef: MatDialogRef<ProductFormComponent>,
  ) {}

  fileInput: FileInput;
  createProductDto = new CreateProductDto();
  uploadImageDto = new UploadFilesDto();
  categories: CategoryModel[] = [];
  discounts: DiscountModel[] = [];
  faX = faX;

  ngOnInit() {
    this.categoryService.categories$.subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });
    this.discountService.discounts$.subscribe({
      next: (discounts) => {
        this.discounts = discounts;
      },
    });
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
        this.dialogRef.close();
      },
      error: (e: HttpErrorResponse) => {
        e.error.message.forEach((m: any) => {
          this.toast.error(m.error);
        });
        console.log(e);
      },
      complete: () => {
        console.log('complete');
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

    return this.productService.createProduct$(this.createProductDto).pipe(
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
