import { Injectable } from '@angular/core';
import { LaGymConfigService } from './config/la-gym-config.service';
export interface subject {
  name: string;
  stex: {
    name: string;
    grade: '1' | '2' | '3' | '4' | '5' | '6' | '';
    didaktik: boolean;
  }[];
  wpf_ects: number;
  wpfs: module[];
  didaktik: module[];
  modules: module[];
}

export interface module {
  name: string;
  ects: 0 | 2.5 | 5 | 7.5 | 10;
  grade:
    | '1.0'
    | '1.3'
    | '1.7'
    | '2.0'
    | '2.3'
    | '2.7'
    | '3.0'
    | '3.3'
    | '3.7'
    | '4.0'
    | '4.3'
    | 'bestanden'
    | '';
  weight: number;
  ba: 'pflicht' | 'tauglich' | 'nein';
  options: string;
}

export const ECTS = [2.5, 5, 7.5, 10];

export const GRADES = [
  '1.0',
  '1.3',
  '1.7',
  '2.0',
  '2.3',
  '2.7',
  '3.0',
  '3.3',
  '3.7',
  '4.0',
  '4.3',
];

export interface degree {
  subjects: { [key: string]: subject };
  ews: subject;
  others: subject;
  stex_ects: {
    subject_ects: number;
    didaktik_ects: number;
    ews_ects: number;
    other_ects: number;
  };
  ba_ects: {
    subject_ects: number;
    didaktik_ects: number;
    ews_ects: number;
    other_ects: number;
  };
  n: number;
  ba: {
    ects: number;
    grade: string;
  };
  weights: {
    uni: number;
    stex: number;
    fachwissenschaft_zu_did: number;
    did_zu_fachwissenschaft: number;
    fach: number;
    ews: number;
    zula: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class DegreeSpecsService {
  degrees: {
    [key: string]: degree;
  } = {
    'Lehramt Gymnasium': {
      subjects: this.lagym.getSubjects(),
      ews: this.lagym.getEWS(),
      others: this.lagym.getOthers(),
      stex_ects: {
        subject_ects: 95,
        didaktik_ects: 10,
        ews_ects: 35,
        other_ects: 26,
      },
      ba_ects: {
        subject_ects: 70,
        didaktik_ects: 5,
        ews_ects: 15,
        other_ects: 16,
      },
      ba: {
        ects: 10,
        grade: '',
      },
      weights: {
        uni: 4 / 10,
        stex: 6 / 10,
        fachwissenschaft_zu_did: 8 / 9,
        did_zu_fachwissenschaft: 1 / 9,
        fach: 3 / 8,
        ews: 1 / 8,
        zula: 1 / 8,
      },
      n: 2,
    },
    'Lehramt Realschule': {
      subjects: this.lagym.getSubjects(),
      ews: this.lagym.getEWS(),
      others: this.lagym.getOthers(),
      stex_ects: {
        subject_ects: 60,
        didaktik_ects: 12,
        ews_ects: 35,
        other_ects: 30.5,
      },
      ba_ects: {
        subject_ects: 70,
        didaktik_ects: 5,
        ews_ects: 15,
        other_ects: 16,
      },
      ba: {
        ects: 10,
        grade: '',
      },
      weights: {
        uni: 4 / 10,
        stex: 6 / 10,
        fachwissenschaft_zu_did: 3 / 4,
        did_zu_fachwissenschaft: 1 / 4,
        fach: 3 / 9,
        ews: 2 / 9,
        zula: 1 / 9,
      },
      n: 2,
    },
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
      return Object.keys(this.degrees[degreeName].subjects);
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

  constructor(private lagym: LaGymConfigService) {}
}
