import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteFormComponent } from './white-form.component';

describe('WhiteFormComponent', () => {
  let component: WhiteFormComponent;
  let fixture: ComponentFixture<WhiteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhiteFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhiteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
