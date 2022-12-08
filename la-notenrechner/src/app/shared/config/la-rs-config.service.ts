import { Injectable } from '@angular/core';
// import * as inf from './la-rs/la-rs-informatik.json';
// import * as mat from './la-rs/la-rs-mathematik.json';
// import * as geographie from './la-rs/la-rs-geographie.json';
// import * as biologie from './la-rs/la-rs-biologie.json';
// import * as chemie from './la-rs/la-rs-chemie.json';
// import * as ews from './la-rs/la-rs-ews.json';
// import * as others from './la-rs/la-rs-others.json';
import { subject } from 'src/app/shared/degree-specs.service';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class LaRsConfigService {
  // informatik: subject = (inf as any).default;
  // mathematik: subject = (mat as any).default;
  // geographie: subject = (geographie as any).default;
  // biologie: subject = (biologie as any).default;
  // chemie: subject = (chemie as any).default;
  // ews: subject = (ews as any).default;
  // others: subject = (others as any).default;

  subjects: { [key: string]: subject } = {};

  private subject_dummy = {
    name: 'dummy',
    stex: [],
    wpf_ects: 0,
    wpfs: [],
    didaktik: [],
    modules: [],
  };

  ews: subject = this.subject_dummy;
  others: subject = this.subject_dummy;

  getSubjects(): { [key: string]: subject } {
    return this.subjects;
  }

  getEWS(): subject {
    return this.ews;
  }

  getOthers(): subject {
    return this.others;
  }
  constructor(private http: HttpService) {
    http.silent = true;

    // get dict to look up all config filenames
    this.getAsset('config_data.json').then((response) => {
      let data = response.body['rs'];

      // pull config for each filename
      data.forEach((filename: string) => {
        this.getAsset('la-rs/' + filename).then((response) => {
          let config = response.body;

          // sort config into correct variable
          if (filename.indexOf('ews') != -1) {
            this.ews = config;
          } else if (filename.indexOf('others') != -1) {
            this.others = config;
          } else {
            this.subjects[config.name] = config;
          }
        });
      });
    });
  }

  private getAsset(name: string) {
    return this.http.jsonRequest('get ' + name, 'assets/config/' + name, 'GET');
  }
}
