import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { subject } from '../models/subject';
import { LaSchulartConfig } from './la-schulart-config';

@Injectable({
  providedIn: 'root',
})
export class LaGymConfigService {
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
    this.config = new LaSchulartConfig(http, 'gym');
  }

  async loadData() {
    await this.config.loadData();
  }
}
