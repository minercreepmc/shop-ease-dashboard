import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticBodyComponent } from './analytic-body.component';

describe('AnalyticBodyComponent', () => {
  let component: AnalyticBodyComponent;
  let fixture: ComponentFixture<AnalyticBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticBodyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
