import { TestBed } from '@angular/core/testing';

import { DownloadConfigService } from './download-config.service';

describe('DownloadConfigService', () => {
  let service: DownloadConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
