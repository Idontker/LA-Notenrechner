import {module} from './module';
import {stex_pr} from './stex_pr';

export interface subject {
  name: string;
  fachname: string;
  /**
   * Po version
   */
  po: number;
  stex: stex_pr[];
  wpf_ects: number;
  wpfs: module[];
  didaktik: module[];
  modules: module[];
}

export function subject_dummy(): subject {
  return {
    name: 'dummy',
    fachname: 'dummy',
    po: -1,
    stex: [],
    wpf_ects: 0,
    wpfs: [],
    didaktik: [],
    modules: [],
  };
}
