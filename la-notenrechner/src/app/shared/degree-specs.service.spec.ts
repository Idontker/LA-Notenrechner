import { TestBed } from '@angular/core/testing';

import { DegreeSpecsService } from './degree-specs.service';

describe('DegreeSpecsService', () => {
  let service: DegreeSpecsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DegreeSpecsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
