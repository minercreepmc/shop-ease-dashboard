import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingStatusUpdateFormComponent } from './shipping-status-update-form.component';

describe('ShippingStatusUpdateFormComponent', () => {
  let component: ShippingStatusUpdateFormComponent;
  let fixture: ComponentFixture<ShippingStatusUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingStatusUpdateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingStatusUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
