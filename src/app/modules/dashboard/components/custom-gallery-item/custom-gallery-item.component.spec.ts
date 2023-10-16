import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomGalleryItemComponent } from './custom-gallery-item.component';

describe('CustomGalleryItemComponent', () => {
  let component: CustomGalleryItemComponent;
  let fixture: ComponentFixture<CustomGalleryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomGalleryItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomGalleryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
