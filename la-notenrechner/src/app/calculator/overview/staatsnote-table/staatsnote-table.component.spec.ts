import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaatsnoteTableComponent } from './staatsnote-table.component';

describe('StaatsnoteTableComponent', () => {
  let component: StaatsnoteTableComponent;
  let fixture: ComponentFixture<StaatsnoteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaatsnoteTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaatsnoteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
