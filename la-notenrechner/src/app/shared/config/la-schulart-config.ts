import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { subject, subject_dummy } from '../models/subject';

// @Injectable({
//   providedIn: 'root',
// })
export class LaSchulartConfig {
  schulart: 'gym' | 'rs' | 'ms' | 'gs' = 'gym';
  setSchulart(_schulart: 'gym' | 'rs' | 'ms' | 'gs') {
    this.schulart = _schulart;
  }

  subjects: { [key: string]: subject } = {};

  ews: subject = subject_dummy;
  others: subject = subject_dummy;

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

    console.log('load data for schulart', this.schulart);
    // get dict to look up all config filenames
    this.getAsset('config_data.json').then((response) => {
      console.log(response);
      let data = response.body[this.schulart];
      console.log(data);

      console.log('load data for schulart', this.schulart);
      // pull config for each filename
      data.forEach((filename: string) => {
        let fname = 'la-' + this.schulart + '/' + filename;

        this.getAsset(fname).then((response) => {
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
