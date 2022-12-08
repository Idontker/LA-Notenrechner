import { module } from './module';
import { stex_pr } from './stex_pr';

export interface subject {
  name: string;
  stex: stex_pr[];
  wpf_ects: number;
  wpfs: module[];
  didaktik: module[];
  modules: module[];
}

export const subject_dummy: subject = {
  name: 'dummy',
  stex: [],
  wpf_ects: 0,
  wpfs: [],
  didaktik: [],
  modules: [],
};
