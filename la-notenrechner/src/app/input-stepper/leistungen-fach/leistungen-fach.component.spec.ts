import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeistungenFachComponent } from './leistungen-fach.component';

describe('LeistungenFachComponent', () => {
  let component: LeistungenFachComponent;
  let fixture: ComponentFixture<LeistungenFachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeistungenFachComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeistungenFachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
