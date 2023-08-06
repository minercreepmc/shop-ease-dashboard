import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesChipComponent } from './categories-chip.component';

describe('CategoriesChipComponent', () => {
  let component: CategoriesChipComponent;
  let fixture: ComponentFixture<CategoriesChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesChipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
