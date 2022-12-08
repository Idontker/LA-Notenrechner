export interface module {
  name: string;
  // TODO: das muss nicht unbedingt stimmen - es git auch wildere zahlen - vielleicht sollte man das vereinheitlichen
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
