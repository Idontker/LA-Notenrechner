import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectExpensionPanelComponent } from './subject-expension-panel.component';

describe('SubjectExpensionPanelComponent', () => {
  let component: SubjectExpensionPanelComponent;
  let fixture: ComponentFixture<SubjectExpensionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectExpensionPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectExpensionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
