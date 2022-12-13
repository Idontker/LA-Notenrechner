import {Injectable} from '@angular/core';
import {HttpService} from '../http.service';
import {subject, subject_dummy} from '../models/subject';

// @Injectable({
//   providedIn: 'root',
// })
export class LaSchulartConfig {
  schulart: 'gym' | 'rs' | 'ms' | 'gs' = 'gym';

  setSchulart(_schulart: 'gym' | 'rs' | 'ms' | 'gs') {
    this.schulart = _schulart;
  }

  subjects: { [key: string]: subject } = {};

  // ews: subject = subject_dummy(this.schulart);
  // others: subject = subject_dummy(this.schulart);

  ews: subject;
  others: subject;

  getSubjects(): { [key: string]: subject } {
    return this.subjects;
  }

  getEWS(): subject {
    return this.ews;
  }

  getOthers(): subject {
    return this.others;
  }

  constructor(
    private http: HttpService,
    _schulart: 'gym' | 'rs' | 'ms' | 'gs'
  ) {
    http.silent = true;
    this.setSchulart(_schulart);

    this.ews = subject_dummy();
    this.others = subject_dummy();
  }

  async loadData() {
    // look up config file to get all the filenames saved in assets
    let data: any[] = [];
    await this.getAsset('config_data.json').then((response) => {
      data = response.body[this.schulart];
    });

    // look up config file to get all the filenames saved in assets
    for (let filename of data) {
      let fname = 'la-' + this.schulart + '/' + filename;

      await this.getAsset(fname).then((response) => {
        let config = response.body;

          //for compatibility with files without po-version
          if (config.po === undefined) config.po = -1;//-1 = only one version available

          // sort config into correct variable
          if (filename.indexOf('ews') != -1) {
            this.ews = config;
            console.log(this.ews);
          } else if (filename.indexOf('others') != -1) {
            this.others = config;
          } else {
            //key will be: <subjectName> if only one po-version available and <subjectName PO-Version> for multiple versions
            this.subjects[config.po === -1 ? config.name : `${config.name} ${config.po}`] = config;
          }
        });
      });
    });
  }

  private getAsset(name: string) {
    return this.http.jsonRequest('get ' + name, 'assets/config/' + name, 'GET');
  }
}
