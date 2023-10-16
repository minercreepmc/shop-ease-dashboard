import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-custom-gallery-item',
  templateUrl: './custom-gallery-item.component.html',
  styleUrls: ['./custom-gallery-item.component.scss'],
  standalone: true,
})
export class CustomGalleryItemComponent {
  @Input() src: string;
  get imageUrl(): SafeResourceUrl | undefined {
    if (this.src) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
    }
    return;
  }

  constructor(private sanitizer: DomSanitizer) {}
}
