import { TestBed } from '@angular/core/testing';

import { DegreeCalculatorService } from './degree-calculator.service';

describe('DegreeCalculatorService', () => {
  let service: DegreeCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DegreeCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
