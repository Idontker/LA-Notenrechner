import { Component, Input, OnChanges } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { module, subject } from 'src/app/shared/degree-specs.service';

@Component({
  selector: 'app-subject-expension-panel',
  templateUrl: './subject-expension-panel.component.html',
  styleUrls: ['./subject-expension-panel.component.scss'],
  viewProviders: [MatExpansionPanel],
})
export class SubjectExpensionPanelComponent implements OnChanges {
  @Input()
  subject!: subject;

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.getPassedModules());
  }

  displayedColumns = ['name', 'grade', 'ects'];
  dataSource = new MatTableDataSource(this.getPassedModules());

  private getPassedModules(): module[] {
    if (!this.subject) {
      return [];
    }
    let sub = this.subject;
    let allModules: module[] = sub.modules.concat(
      sub.didaktik.concat(sub.wpfs)
    );
    let passed: module[] = [];
    allModules.forEach((m) => {
      if (m.grade != '') {
        passed.push(m);
      }
    });
    return passed;
  }

  constructor() {}

  getTotalECTS() {
    let total: number = 0.0;
    this.subject.modules.forEach((m) => (total += m.ects));
    this.subject.didaktik.forEach((m) => (total += m.ects));
    total += this.subject.wpf_ects;
    return total;
  }

  getPassedECTS() {
    let total: number = 0.0;

    let temp = [this.subject.modules, this.subject.didaktik, this.subject.wpfs];
    temp.forEach((arr) => {
      arr.forEach((m) => {
        if (m.grade != '') {
          total += m.ects;
        }
      });
    });
    return total;
  }

  getAvgGradeFachwissenschaft() {
    let modules = this.subject.modules.concat(this.subject.wpfs);
    return this.getAvgGrade(modules);
  }

  getAvgGradeDidaktik() {
    return this.getAvgGrade(this.subject.didaktik);
  }

  getAvgGrade(modules: module[]) {
    let ects = 0;
    let total = 0.0;
    modules.forEach((m) => {
      if (m.grade != '' && m.grade != 'bestanden') {
        let grade = parseFloat(m.grade);
        ects += m.weight * m.ects;
        total += m.weight * grade * m.ects;
      }
    });

    return total / ects;
  }

  gradeString(grade: number): string {
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
