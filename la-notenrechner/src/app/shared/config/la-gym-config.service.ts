import { Injectable } from '@angular/core';
import * as inf from './la-gym/la-gym-informatik.json';
import * as mat from './la-gym/la-gym-mathematik.json';
import * as geographie from './la-gym/la-gym-geographie.json';
import * as physik from './la-gym/la-gym-physik.json';
import * as physik20 from './la-gym/la-gym-physik20.json';
import * as ews from './la-gym/la-gym-ews.json';
import * as others from './la-gym/la-gym-others.json';
import { subject } from 'src/app/shared/degree-specs.service';

@Injectable({
  providedIn: 'root',
})
export class LaGymConfigService {
  informatik: subject = (inf as any).default;
  mathematik: subject = (mat as any).default;
  geographie: subject = (geographie as any).default;
  physik: subject = (physik as any).default;
  physik20: subject = (physik20 as any).default;
  ews: subject = (ews as any).default;
  others: subject = (others as any).default;

  getSubjects(): { [key: string]: subject } {
    let ret: { [key: string]: subject } = {};

    ret[this.mathematik.name] = this.mathematik;
    ret[this.informatik.name] = this.informatik;
    ret[this.physik.name] = this.physik;
    ret[this.physik20.name] = this.physik20;
    ret[this.geographie.name] = this.geographie;

    console.log('config:', ret);

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
