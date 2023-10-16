import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingStatusListComponent } from './shipping-status-list.component';

describe('ShippingStatusListComponent', () => {
  let component: ShippingStatusListComponent;
  let fixture: ComponentFixture<ShippingStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingStatusListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
