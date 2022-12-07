import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStexComponent } from './create-stex.component';

describe('CreateStexComponent', () => {
  let component: CreateStexComponent;
  let fixture: ComponentFixture<CreateStexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateStexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
