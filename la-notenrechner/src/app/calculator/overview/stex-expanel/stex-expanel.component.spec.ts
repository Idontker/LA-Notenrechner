import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StexExpanelComponent } from './stex-expanel.component';

describe('StexExpanelComponent', () => {
  let component: StexExpanelComponent;
  let fixture: ComponentFixture<StexExpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StexExpanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StexExpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
