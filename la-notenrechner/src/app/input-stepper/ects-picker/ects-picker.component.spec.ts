import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EctsPickerComponent } from './ects-picker.component';

describe('EctsPickerComponent', () => {
  let component: EctsPickerComponent;
  let fixture: ComponentFixture<EctsPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EctsPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EctsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
