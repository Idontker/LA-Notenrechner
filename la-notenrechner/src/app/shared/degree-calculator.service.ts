import { Injectable } from '@angular/core';
import { degree, module, subject } from './degree-specs.service';

@Injectable({
  providedIn: 'root',
})
export class DegreeCalculatorService {
  constructor() {}

  /**
   * @param stexMode If stexMode == false, then baMode == true
   */
  getTotalECTS(
    degree: degree,
    subject: subject,
    stexMode: boolean = true
  ): number {
    if (subject.name == 'EWS') {
      return this.getEWSECTS(degree, stexMode);
    } else if (subject.name == 'Sonstiges') {
      return this.getOthersECTS(degree, stexMode);
    } else {
      return this.getSubjectECTS(degree, stexMode);
    }
  }
  private getEWSECTS(degree: degree, stexMode: boolean): number {
    if (stexMode) {
      return degree.stex_ects.ews_ects;
    } else {
      // Ba Mode
      return degree.ba_ects.ews_ects;
    }
  }

  private getOthersECTS(degree: degree, stexMode: boolean): number {
    if (stexMode) {
      return degree.stex_ects.other_ects;
    } else {
      // Ba Mode
      return degree.ba_ects.other_ects;
    }
  }

  private getSubjectECTS(degree: degree, stexMode: boolean): number {
    if (stexMode) {
      return degree.stex_ects.subject_ects + degree.stex_ects.didaktik_ects;
    } else {
      // Ba Mode
      return degree.ba_ects.subject_ects + degree.ba_ects.didaktik_ects;
    }
  }

  /**
   *
   * @param degree
   * @param stexMode If stexMode == false, then baMode == true
   */
  getPassedECTS(subject: subject, stexMode: boolean = true): number {
    let total: number = 0.0;

    let temp = [subject.modules, subject.didaktik, subject.wpfs];
    temp.forEach((arr) => {
      arr.forEach((m) => {
        if ((stexMode || m.ba != 'nein') && m.grade != '') {
          total += m.ects;
        }
      });
    });
    return total;
  }

  // ===========================
  // ===========================
  // ===========================

  getAvgGrade(
    subject: subject,
    stexMode: boolean = true,
    replace_val: number | undefined = undefined
  ) {
    if (subject.didaktik.length == 0) {
      return this._gradeString(
        this.getAvgGradeFachwissenschaft(subject, stexMode)
      );
    } else {
      return [
        this._gradeString(this.getAvgGradeFachwissenschaft(subject, stexMode)),
        this._gradeString(this.getAvgGradeDidaktik(subject, stexMode)),
      ];
    }
  }

  // TODO: create a service
  getAvgGradeFachwissenschaft(
    subject: subject,
    stexMode: boolean,
    replace_val: number | undefined = undefined
  ) {
    let modules = subject.modules.concat(subject.wpfs);
    return this._getAvgGrade(modules, stexMode);
  }

  // TODO: create a service
  getAvgGradeDidaktik(
    subject: subject,
    stexMode: boolean,
    replace_val: number | undefined = undefined
  ) {
    return this._getAvgGrade(subject.didaktik, stexMode);
  }

  private _getAvgGrade(
    modules: module[],
    stexMode: boolean,
    replace_val: number | undefined = undefined
  ) {
    let ects = 0;
    let total = 0.0;
    modules.forEach((m) => {
      // Überspringe das Modul, falls nicht alle angezeigt werden (stexModus) oder ba == "tauglich" oder "pflicht"
      if (!(stexMode || m.ba != 'nein')) {
        return;
      }
      // Überspringe das Modul falls es das Gewicht 0 hat
      if (m.weight == 0) {
        return;
      }
      if (m.grade != '' && m.grade != 'bestanden') {
        // Normale Berechnung
        let grade = parseFloat(m.grade);
        ects += m.weight * m.ects;
        total += m.weight * grade * m.ects;
      } else if (replace_val != undefined) {
        // Berechnung mit ersatzwerte (für Best case/worst case Szenarien)
        let grade = replace_val;
        ects += m.weight * m.ects;
        total += m.weight * grade * m.ects;
      }
    });

    return total / ects;
  }

  _gradeString(grade: number): string {
    var rounded = Math.round(grade * 100) / 100;
    var s = '' + rounded;
    if (s.indexOf('.') == -1) {
      return s + '.00';
    } else if (s.split('.')[1].length == 1) {
      return s + '0';
    } else {
      return s;
    }
  }
}
