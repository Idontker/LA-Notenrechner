import { Injectable } from '@angular/core';
import * as inf from './la-gym/la-gym-informatik.json';
import * as mat from './la-gym/la-gym-mathematik.json';
import * as ews from './la-gym/la-gym-ews.json';
import * as others from './la-gym/la-gym-others.json';

import { subject } from 'src/app/input-stepper/input-stepper.module';

@Injectable({
  providedIn: 'root',
})
export class LaGymConfigService {
  informatik: subject = (inf as any).default;
  mathematik: subject = (mat as any).default;
  ews: subject = (ews as any).default;
  others: subject = (others as any).default;

  getSubjects(): { [key: string]: subject } {
    let ret: { [key: string]: subject } = {};

    ret[this.mathematik.name] = this.mathematik;
    ret[this.informatik.name] = this.informatik;

    return ret;
  }

  getEWS(): subject {
    return this.ews;
  }

  getOthers(): subject {
    return this.others;
  }

  constructor() {}
}
