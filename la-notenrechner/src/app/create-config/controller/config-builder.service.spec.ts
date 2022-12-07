import { TestBed } from '@angular/core/testing';

import { ConfigBuilderService } from './config-builder.service';

describe('ConfigBuilderService', () => {
  let service: ConfigBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
