import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputStepperComponent } from './input-stepper.component';

describe('InputStepperComponent', () => {
  let component: InputStepperComponent;
  let fixture: ComponentFixture<InputStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputStepperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
