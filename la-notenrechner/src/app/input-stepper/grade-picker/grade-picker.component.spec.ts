import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradePickerComponent } from './grade-picker.component';

describe('GradePickerComponent', () => {
  let component: GradePickerComponent;
  let fixture: ComponentFixture<GradePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
