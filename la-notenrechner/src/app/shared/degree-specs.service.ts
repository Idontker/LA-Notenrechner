import {Injectable} from '@angular/core';
import {LaGsConfigService} from './config/la-gs-config.service';
import {LaGymConfigService} from './config/la-gym-config.service';
import {LaMsConfigService} from './config/la-ms-config.service';
import {LaRsConfigService} from './config/la-rs-config.service';
import {LA_GS, LA_GYM, LA_MS, LA_RS} from './config/supported_degrees';
import {degree} from './models/degree';
import {subject} from './models/subject';

export const ECTS = [2.5, 5, 7.5, 10];

@Injectable({
  providedIn: 'root',
})
export class DegreeSpecsService {
  degrees: {
    [key: string]: degree;
  } = {
    'Lehramt Gymnasium': LA_GYM,
    'Lehramt Realschule': LA_RS,
    'Lehramt Mittelschule': LA_MS,
    'Lehramt Grundschule': LA_GS,
  };

  getDegreeNames(): string[] {
    return Object.keys(this.degrees);
  }

  getDegreeSubjectCount(degreeName: string): number {
    if (this.degrees[degreeName]) {
      return this.degrees[degreeName].n;
    }
    return 0;
  }

  getSubjectNames(degreeName: string): string[] {
    if (this.degrees[degreeName]) {
      let names: string[] = [];

      let subject: subject;
      for (let key in this.degrees[degreeName].subjects) {
        subject = this.degrees[degreeName].subjects[key];

        //only one version (po set to -1) => add name like before
        if (subject.po === -1) names.push(subject.name);
        //valid value for po (not -1) => multiple versions available, only add subject name if not already there
        else if (names.indexOf(subject.name) === -1) names.push(subject.name);
      }
      return names;
      //return Object.keys(this.degrees[degreeName].subjects);
    }
    return [];
  }

  getDegreeObject(
    degreeName: string,
    selectedSubjects: string[]
  ): degree | undefined {
    let degree = this.degrees[degreeName];
    if (!degree) {
      return undefined;
    }
    let sub: { [key: string]: subject } = {};
    selectedSubjects.forEach((selectedSubject) => {
      sub[selectedSubject] = degree.subjects[selectedSubject];
    });
    return {
      subjects: sub,
      ews: degree.ews,
      others: degree.others,
      stex_ects: degree.stex_ects,
      ba_ects: degree.ba_ects,
      n: degree.n,
      ba: degree.ba,
      weights: degree.weights,
    };
  }

  getSubjectObject(
    degreeName: string,
    subjectName: string
  ): subject | undefined {
    let degree = this.degrees[degreeName];
    if (!degree) {
      return undefined;
    }

    if (subjectName == 'EWS') {
      return degree.ews;
    }

    if (subjectName == 'Sonstiges') {
      return degree.others;
    }

    if (degree.subjects[subjectName]) {
      return degree.subjects[subjectName];
    }

    return undefined;
  }

  constructor(
    private lagym: LaGymConfigService,
    private lars: LaRsConfigService,
    private lams: LaMsConfigService,
    private lags: LaGsConfigService
  ) {
    let gym = this.degrees['Lehramt Gymnasium'];
    let rs = this.degrees['Lehramt Realschule'];
    let ms = this.degrees['Lehramt Mittelschule'];
    let gs = this.degrees['Lehramt Grundschule'];

    gym.subjects = this.lagym.getSubjects();
    gym.ews = this.lagym.getEWS();
    gym.others = this.lagym.getOthers();

    rs.subjects = this.lars.getSubjects();
    rs.ews = this.lars.getEWS();
    rs.others = this.lars.getOthers();

    ms.subjects = this.lams.getSubjects();
    ms.ews = this.lams.getEWS();
    ms.others = this.lams.getOthers();

    gs.subjects = this.lags.getSubjects();
    gs.ews = this.lags.getEWS();
    gs.others = this.lags.getOthers();
  }
}
