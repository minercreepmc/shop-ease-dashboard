import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyticHeaderComponent } from './analytic-header.component';

describe('AnalyticHeaderComponent', () => {
  let component: AnalyticHeaderComponent;
  let fixture: ComponentFixture<AnalyticHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyticHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalyticHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
