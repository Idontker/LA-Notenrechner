import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { subject } from '../models/subject';
import { LaSchulartConfig } from './la-schulart-config';

@Injectable({
  providedIn: 'root',
})
export class LaRsConfigService {
  config: LaSchulartConfig;

  getSubjects(): { [key: string]: subject } {
    return this.config.getSubjects();
  }

  getEWS(): subject {
    return this.config.getEWS();
  }

  getOthers(): subject {
    return this.config.getOthers();
  }

  constructor(private http: HttpService) {
    this.config = new LaSchulartConfig(http);
    this.config.setSchulart('ms');
  }
}
