import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectExpansionPanelComponent } from './subject-expansion-panel.component';

describe('SubjectExpansionPanelComponent', () => {
  let component: SubjectExpansionPanelComponent;
  let fixture: ComponentFixture<SubjectExpansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectExpansionPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
