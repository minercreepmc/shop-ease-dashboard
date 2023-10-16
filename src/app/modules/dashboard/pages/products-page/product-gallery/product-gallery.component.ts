import { NgFor, NgIf } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  GalleryImage,
  GalleryModule,
  GalleryComponent,
} from '@daelmaak/ngx-gallery';
import { CustomGalleryItemComponent } from '@modules/dashboard/components';

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
  ],
})
export class ProductGalleryComponent implements OnInit, AfterViewInit {
  @Input() image_urls: string[];
  @ViewChild(GalleryComponent) gallery: GalleryComponent;
  images: GalleryImage[] = [];
  ngOnInit(): void {
    this.images = this.image_urls.map((url) => new GalleryImage(url, url));
  }

  ngAfterViewInit(): void {
    console.log(this.gallery.selectedIndex);
  }

  onDeleteClick() {
    console.log(this.gallery.selectedIndex);
  }
}
