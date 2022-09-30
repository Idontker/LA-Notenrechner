import { Injectable } from '@angular/core';
import * as inf from './la-rs/la-rs-informatik.json';
import * as mat from './la-rs/la-rs-mathematik.json';
import * as geographie from './la-rs/la-rs-geographie.json';
import * as ews from './la-rs/la-rs-ews.json';
import * as others from './la-rs/la-rs-others.json';
import { subject } from 'src/app/shared/degree-specs.service';

@Injectable({
  providedIn: 'root',
})
export class LaRsConfigService {
  informatik: subject = (inf as any).default;
  mathematik: subject = (mat as any).default;
  geographie: subject = (geographie as any).default;
  ews: subject = (ews as any).default;
  others: subject = (others as any).default;

  getSubjects(): { [key: string]: subject } {
    let ret: { [key: string]: subject } = {};

    ret[this.mathematik.name] = this.mathematik;
    ret[this.informatik.name] = this.informatik;
    ret[this.geographie.name] = this.geographie;

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
