import { degree } from '../models/degree';
import { subject_dummy } from '../models/subject';

export const LA_GYM: degree = {
  subjects: {},
  ews: subject_dummy,
  others: subject_dummy,
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
};

export const LA_RS: degree = {
  subjects: {},
  ews: subject_dummy,
  others: subject_dummy,
  stex_ects: {
    subject_ects: 60,
    didaktik_ects: 12,
    ews_ects: 35,
    other_ects: 30,
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
};

export const LA_MS: degree = {
  subjects: {},
  ews: subject_dummy,
  others: subject_dummy,
  stex_ects: {
    subject_ects: 60,
    didaktik_ects: 12,
    ews_ects: 35,
    other_ects: 30,
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
};

export const LA_GS: degree = {
  subjects: {},
  ews: subject_dummy,
  others: subject_dummy,
  stex_ects: {
    subject_ects: 60,
    didaktik_ects: 12,
    ews_ects: 35,
    other_ects: 30,
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
};
