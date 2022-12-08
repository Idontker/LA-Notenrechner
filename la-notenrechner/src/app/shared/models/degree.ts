import { subject } from './subject';

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
