import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOverviewComponent } from './input-overview.component';

describe('InputOverviewComponent', () => {
  let component: InputOverviewComponent;
  let fixture: ComponentFixture<InputOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
