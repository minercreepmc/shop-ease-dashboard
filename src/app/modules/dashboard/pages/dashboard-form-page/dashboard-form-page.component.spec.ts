import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFormPageComponent } from './dashboard-form-page.component';

describe('DashboardFormPageComponent', () => {
  let component: DashboardFormPageComponent;
  let fixture: ComponentFixture<DashboardFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardFormPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
