import { NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import {
  GalleryImage,
  GalleryModule,
  GalleryComponent,
} from '@daelmaak/ngx-gallery';
import { DestroyFileDto } from '@dto';
import {
  ConfirmDialogComponent,
  CustomGalleryItemComponent,
} from '@modules/dashboard/components';
import { UploadService } from '@service';
import { ProductImageService } from '@service/product-image.service';
import { ToastrCustomService } from '@shared/libraries/toastr';
import { concatMap, map, tap } from 'rxjs';

@Component({
  selector: 'app-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss'],
  standalone: true,
  imports: [
    GalleryModule,
    NgFor,
    NgIf,
    CustomGalleryItemComponent,
    MatIconModule,
    MatButtonModule,
  ],
})
export class ProductGalleryComponent implements OnInit, AfterViewInit {
  constructor(
    private dialog: MatDialog,
    private uploadService: UploadService,
    private productImageService: ProductImageService,
    private toast: ToastrCustomService,
    private route: ActivatedRoute,
  ) {}
  @Input() image_urls: string[];
  id: string;
  @ViewChild(GalleryComponent) gallery: GalleryComponent;
  images: GalleryImage[] = [];
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.images = this.image_urls.map((url) => new GalleryImage(url, url));
  }

  ngAfterViewInit(): void {
    console.log(this.gallery.selectedIndex);
  }

  onDeleteClick() {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.destroyImages({
            fileUrl: this.image_urls[this.gallery.selectedIndex],
          }).subscribe({
            next: () => {
              this.toast.success('Delete image successfully');
            },
            error: (e: HttpErrorResponse) => {
              e.error.message.forEach((m: any) => {
                this.toast.error(m.error);
              });
              console.log(e);
            },
          });
        }
      });
  }

  destroyImages(dto: DestroyFileDto) {
    return this.uploadService.destroy(dto).pipe(
      concatMap(() => {
        return this.productImageService.removeImage$({
          url: this.image_urls[this.gallery.selectedIndex],
          productId: this.id,
        });
      }),
      map(() => {
        return this.images.filter((image) => {
          return image.src !== this.image_urls[this.gallery.selectedIndex];
        });
      }),
      tap((newImages) => {
        this.images = newImages.filter((image) => image !== null);
      }),
    );
  }
}
