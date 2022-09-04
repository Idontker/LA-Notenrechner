import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudiengangComponent } from './studiengang.component';

describe('StudiengangComponent', () => {
  let component: StudiengangComponent;
  let fixture: ComponentFixture<StudiengangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudiengangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudiengangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
