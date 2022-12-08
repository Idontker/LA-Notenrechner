import { Component, OnChanges, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DegreeCalculatorService } from 'src/app/shared/degree-calculator.service';
import { degree } from 'src/app/shared/models/degree';
import { subject } from 'src/app/shared/models/subject';

@Component({
  selector: 'app-staatsnote-table',
  templateUrl: './staatsnote-table.component.html',
  styleUrls: ['./staatsnote-table.component.scss'],
})
export class StaatsnoteTableComponent implements OnChanges {
  @Input()
  degree!: degree;

  dataSource = new MatTableDataSource(this.buildTableData());

  displayedColumns = [
    'weight',
    'name',
    'subdivision',
    'grade',
    'best',
    'worst',
  ];

  constructor(private calc: DegreeCalculatorService) {}

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.buildTableData());
  }

  private buildTableData() {
    if (!this.degree) {
      return [];
    }
    let subjects: any[] = this.getSubjectArray();
    let zula = this.getZuLa();

    let tableArray: any[] = [];
    subjects.forEach((part) =>
      tableArray.push({
        part: part,
        weight: this.degree.weights.fach,
        type: 'subject',
      })
    );
    tableArray.push({
      part: this.degree.ews,
      weight: this.degree.weights.ews,
      type: 'ews',
    });

    tableArray.push({
      part: zula,
      weight: this.degree.weights.zula,
      type: 'zula',
    });

    tableArray.push({
      type: 'total',
    });

    return tableArray;
  }

  private getSubjectArray(): subject[] {
    let ret: subject[] = [];
    Object.keys(this.degree.subjects).forEach((key) => {
      ret.push(this.degree.subjects[key]);
    });
    return ret;
  }
  private getZuLa() {
    let other_modules = this.degree.others.modules;
    for (let i = 0; i < other_modules.length; i++) {
      if (
        other_modules[i].name == 'Zulassungsarbeit' ||
        other_modules[i].name == 'ZuLa'
      ) {
        return other_modules[i];
      }
    }
    return null;
  }

  getGradeFach(subject: subject) {
    return this.calc.getStexGradeFach(this.degree, subject);
  }

  getBestGradeFach(subject: subject) {
    return this.calc.getStexGradeFach(this.degree, subject, 1.0);
  }

  getWorstGradeFach(subject: subject) {
    return this.calc.getStexGradeFach(this.degree, subject, 4.0);
  }

  getGradeSubject(subject: subject, didaktik: boolean) {
    if (didaktik) {
      return this.calc.getStexGradeDidaktik(this.degree, subject);
    }
    return this.calc.getStexGradeFachwissenschaft(this.degree, subject);
  }

  getBestGradeSubject(subject: subject, didaktik: boolean) {
    if (didaktik) {
      return this.calc.getStexGradeDidaktik(this.degree, subject, 1.0);
    }
    return this.calc.getStexGradeFachwissenschaft(this.degree, subject, 1.0);
  }

  getWorstGradeSubject(subject: subject, didaktik: boolean) {
    if (didaktik) {
      return this.calc.getStexGradeDidaktik(this.degree, subject, 4.0);
    }
    return this.calc.getStexGradeFachwissenschaft(this.degree, subject, 4.0);
  }

  getGradeEWS() {
    return this.calc.getStexGradeEWS(this.degree);
  }

  getBestGradeEWS() {
    return this.calc.getStexGradeEWS(this.degree, 1.0);
  }

  getWorstGradeEWS() {
    return this.calc.getStexGradeEWS(this.degree, 4.0);
  }

  getGradeTotal() {
    return this.calc.getGradeTotal(this.degree);
  }

  getBestGradeTotal() {
    return this.calc.getGradeTotal(this.degree, 1.0);
  }

  getWorstGradeTotal() {
    return this.calc.getGradeTotal(this.degree, 4.0);
  }

  formatWeight(weight: number): string {
    let x: number = Math.round(weight * 10_000) / 100;
    return x + '%';
  }
}
