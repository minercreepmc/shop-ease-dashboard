import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountsHomeComponent } from './discounts-home.component';

describe('DiscountsHomeComponent', () => {
  let component: DiscountsHomeComponent;
  let fixture: ComponentFixture<DiscountsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscountsHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscountsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
