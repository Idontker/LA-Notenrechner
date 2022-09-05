import { Injectable } from '@angular/core';
import { LaGymConfigService } from './config/la-gym-config.service';
import { subject } from '../input-stepper/input-stepper.module';
import { module } from '../input-stepper/input-stepper.module';

@Injectable({
  providedIn: 'root',
})
export class DegreeSpecsService {
  degrees: {
    [key: string]: {
      subjects: { [key: string]: subject };
      ews: subject;
      others: subject;
      stex_ects: {
        subject_ects: number;
        didaktik_ects: number;
        ews_ects: number;
      };
      ba_ects: {
        subject_ects: number;
        didaktik_ects: number;
        ews_ects: number;
      };
      n: number;
      ba: {
        ects: number;
        grade: string;
      };
    };
  } = {
    'Lehramt Gymnasium': {
      subjects: this.lagym.getSubjects(),
      ews: this.lagym.getEWS(),
      others: this.lagym.getOthers(),
      stex_ects: {
        subject_ects: 95,
        didaktik_ects: 10,
        ews_ects: 35,
      },
      ba_ects: {
        subject_ects: 70,
        didaktik_ects: 5,
        ews_ects: 15,
      },
      ba: {
        ects: 10,
        grade: '',
      },
      n: 2,
    },
    'Lehramt Realschule': {
      subjects: this.lagym.getSubjects(),
      ews: this.lagym.getEWS(),
      others: this.lagym.getOthers(),
      stex_ects: {
        subject_ects: 70,
        didaktik_ects: 10,
        ews_ects: 35,
      },
      ba_ects: {
        subject_ects: 70,
        didaktik_ects: 5,
        ews_ects: 15,
      },
      ba: {
        ects: 10,
        grade: '',
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
