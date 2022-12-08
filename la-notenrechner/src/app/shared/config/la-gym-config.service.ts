import { Injectable } from '@angular/core';
// import * as inf from './la-gym/la-gym-informatik.json';
// import * as mat from './la-gym/la-gym-mathematik.json';
// import * as geographie from './la-gym/la-gym-geographie.json';
// import * as biologie from './la-gym/la-gym-biologie.json';
// import * as chemie from './la-gym/la-gym-chemie.json';
// import * as physik from './la-gym/la-gym-physik.json';
// import * as physik20 from './la-gym/la-gym-physik20.json';
// import * as ews from './la-gym/la-gym-ews.json';
// import * as others from './la-gym/la-gym-others.json';
import { subject } from 'src/app/shared/degree-specs.service';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root',
})
export class LaGymConfigService {
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
      let data = response.body['gym'];

      // pull config for each filename
      data.forEach((filename: string) => {
        this.getAsset('la-gym/' + filename).then((response) => {
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
