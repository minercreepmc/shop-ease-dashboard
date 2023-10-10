import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingFeePageComponent } from './shipping-fee-page.component';

describe('ShippingFeePageComponent', () => {
  let component: ShippingFeePageComponent;
  let fixture: ComponentFixture<ShippingFeePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingFeePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingFeePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
