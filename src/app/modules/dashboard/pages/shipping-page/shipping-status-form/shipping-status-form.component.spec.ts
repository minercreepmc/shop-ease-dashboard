import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingStatusFormComponent } from './shipping-status-form.component';

describe('ShippingStatusFormComponent', () => {
  let component: ShippingStatusFormComponent;
  let fixture: ComponentFixture<ShippingStatusFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingStatusFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
