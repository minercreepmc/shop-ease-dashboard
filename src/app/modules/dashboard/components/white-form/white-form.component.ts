import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { CacheStorageFacet, CacheStorageService } from '@service';

@Component({
  selector: 'app-white-form',
  templateUrl: './white-form.component.html',
  styleUrls: ['./white-form.component.scss'],
  standalone: true,
  imports: [MatButtonModule, FormsModule],
})
export class WhiteFormComponent implements OnInit {
  private cacheStorage: CacheStorageFacet;
  constructor(cacheService: CacheStorageService) {
    this.cacheStorage = cacheService.forKey('shipper-form');
  }
  @Input() dto: any;
  @Input() title: string;

  ngOnInit(): void {
    this.restoreCacheStorage();
  }

  @Output() formSubmitted = new EventEmitter<any>();
  onSubmit() {
    this.formSubmitted.emit(this.dto);
  }

  async restoreCacheStorage(): Promise<void> {
    const cachedFormData = await this.cacheStorage.get<any>();

    if (cachedFormData) {
      Object.assign(this.dto, cachedFormData);
    }
  }

  public saveToTemporaryStorage(): void {
    this.cacheStorage.set({
      ...this.dto,
      password: undefined,
    });
  }
}
