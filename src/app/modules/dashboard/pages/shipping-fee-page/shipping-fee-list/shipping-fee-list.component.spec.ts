import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingFeeListComponent } from './shipping-fee-list.component';

describe('ShippingFeeListComponent', () => {
  let component: ShippingFeeListComponent;
  let fixture: ComponentFixture<ShippingFeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingFeeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingFeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
