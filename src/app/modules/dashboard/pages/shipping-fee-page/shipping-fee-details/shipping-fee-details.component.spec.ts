import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingFeeDetailsComponent } from './shipping-fee-details.component';

describe('ShippingFeeDetailsComponent', () => {
  let component: ShippingFeeDetailsComponent;
  let fixture: ComponentFixture<ShippingFeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingFeeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingFeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
