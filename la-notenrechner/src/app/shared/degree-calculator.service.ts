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

    console.log('subject:', subject);
    console.log('stexMode:', stexMode);

    let temp = [subject.modules, subject.didaktik, subject.wpfs];
    console.log(temp);
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
        this.getAvgGradeFachwissenschaft(subject, stexMode, replace_val)
      );
    } else {
      return [
        this._gradeString(
          this.getAvgGradeFachwissenschaft(subject, stexMode, replace_val)
        ),
        this._gradeString(
          this.getAvgGradeDidaktik(subject, stexMode, replace_val)
        ),
      ];
    }
  }

  getAvgGradeFachwissenschaft(
    subject: subject,
    stexMode: boolean,
    replace_val: number | undefined = undefined
  ) {
    let modules = subject.modules.concat(subject.wpfs);
    return this._getAvgGrade(modules, stexMode, replace_val);
  }

  getAvgGradeDidaktik(
    subject: subject,
    stexMode: boolean,
    replace_val: number | undefined = undefined
  ) {
    return this._getAvgGrade(subject.didaktik, stexMode, replace_val);
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
    if (isNaN(grade)) {
      return 'TBD';
    }

    var rounded = Math.round(grade * 100) / 100;
    var s = '' + rounded;
    if (s.indexOf('.') == -1) {
      console.log(grade, s);

      return s + '.00';
    } else if (s.split('.')[1].length == 1) {
      return s + '0';
    } else {
      return s;
    }
  }

  // ===========================
  // ===========================
  // ===========================
  // TODO: create a sub service

  getStexGradeFach(
    degree: degree,
    subject: subject,
    replace_val: number | undefined = undefined
  ): string {
    return this._gradeString(
      this._calcStexGradeFach(degree, subject, replace_val)
    );
  }

  _calcStexGradeFach(
    degree: degree,
    subject: subject,
    replace_val: number | undefined = undefined
  ): number {
    // fachwissenschaft
    let grade_fw = this._calcStexGradeFachwissenschaft(
      degree,
      subject,
      replace_val
    );
    let w_fw = degree.weights.fachwissenschaft_zu_did;

    // didaktik
    let grade_didaktik = this._calcStexGradeDidaktik(
      degree,
      subject,
      replace_val
    );
    let w_did = degree.weights.did_zu_fachwissenschaft;

    return w_did * grade_didaktik + w_fw * grade_fw;
  }

  getStexGradeFachwissenschaft(
    degree: degree,
    subject: subject,
    replace_val: number | undefined = undefined
  ): string {
    return this._gradeString(
      this._calcStexGradeFachwissenschaft(degree, subject, replace_val)
    );
  }

  _calcStexGradeFachwissenschaft(
    degree: degree,
    subject: subject,
    replace_val: number | undefined = undefined
  ): number {
    // uni fachwissenschaft
    let avg_uni = this.getAvgGradeFachwissenschaft(subject, true, replace_val);

    // stex fachwissenschaft
    let sum: number = 0;
    let i = 0;
    subject.stex.forEach((ele) => {
      if (ele.didaktik == false) {
        if (ele.grade != '') {
          // grade eingetragen
          i++;
          sum += parseInt(ele.grade);
        } else if (replace_val != undefined) {
          // grade nicht eingetragen, aber replace_value wurde angegeben
          // für zum Beispiel eine best oder worst case berechnung
          i++;
          sum += replace_val;
        }
      }
    });
    let avg_stex = sum / i;

    return degree.weights.stex * avg_stex + degree.weights.uni * avg_uni;
  }

  getStexGradeDidaktik(
    degree: degree,
    subject: subject,
    replace_val: number | undefined = undefined
  ): string {
    return this._gradeString(
      this._calcStexGradeDidaktik(degree, subject, replace_val)
    );
  }

  _calcStexGradeDidaktik(
    degree: degree,
    subject: subject,
    replace_val: number | undefined = undefined
  ): number {
    // uni didaktik
    let avg_uni = this.getAvgGradeDidaktik(subject, true, replace_val);

    // stex didaktik
    let sum: number = 0;
    let i = 0;
    subject.stex.forEach((ele) => {
      if (ele.didaktik == true) {
        if (ele.grade != '') {
          // grade eingetragen
          i++;
          sum += parseInt(ele.grade);
        } else if (replace_val != undefined) {
          // grade nicht eingetragen, aber replace_value wurde angegeben
          // für zum Beispiel eine best oder worst case berechnung
          i++;
          sum += replace_val;
        }
      }
    });
    let avg_stex = sum / i;

    return degree.weights.stex * avg_stex + degree.weights.uni * avg_uni;
  }

  getStexGradeEWS(degree: degree, replace_val: number | undefined = undefined) {
    return this._gradeString(this._calcStexGradeEWS(degree, replace_val));
  }

  private _calcStexGradeEWS(
    degree: degree,
    replace_val: number | undefined = undefined
  ): number {
    // Uni EWS Note
    let grade_uni = this.getAvgGradeFachwissenschaft(
      degree.ews,
      true,
      replace_val
    );

    // EWS Examens Note
    let grade_stex = NaN;
    if (degree.ews.stex[0].grade != '') {
      grade_stex = parseInt(degree.ews.stex[0].grade);
    } else if (replace_val != undefined) {
      grade_stex = replace_val;
    }

    return degree.weights.uni * grade_uni + degree.weights.stex * grade_stex;
  }

  getGradeTotal(degree: degree, replace_val: number | undefined = undefined) {
    let grade_fach: number[] = [];
    Object.keys(degree.subjects).forEach((key) => {
      let subject = degree.subjects[key];
      grade_fach.push(this._calcStexGradeFach(degree, subject, replace_val));
    });

    let grade_ews = this._calcStexGradeEWS(degree, replace_val);
    let grade_zula = this.getZuLaGrade(degree);
    if (isNaN(grade_zula) && replace_val != undefined) {
      grade_zula = replace_val;
    }

    let total = 0;
    grade_fach.forEach((grade) => {
      total += grade * degree.weights.fach;
    });
    total += grade_ews * degree.weights.ews;
    total += grade_zula * degree.weights.zula;

    return this._gradeString(total);
  }

  private getZuLaGrade(degree: degree): number {
    let other_modules = degree.others.modules;
    for (let i = 0; i < other_modules.length; i++) {
      if (
        other_modules[i].name == 'Zulassungsarbeit' ||
        other_modules[i].name == 'ZuLa'
      ) {
        return parseInt(other_modules[i].grade);
      }
    }
    return NaN;
  }
}
