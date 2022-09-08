import { Component, Input, OnChanges } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { module, subject } from 'src/app/shared/degree-specs.service';

@Component({
  selector: 'app-subject-expansion-panel',
  templateUrl: './subject-expansion-panel.component.html',
  styleUrls: ['./subject-expansion-panel.component.scss'],
  viewProviders: [MatExpansionPanel],
})
export class SubjectExpansionPanelComponent implements OnChanges {
  @Input()
  subject!: subject;
  @Input()
  inputSubject!: subject;
  @Input()
  showPassed!: boolean;
  @Input()
  showOnlyBA!: boolean;

  displayedColumns = ['name', 'grade', 'ects'];

  inputedModules = this.getModuleDict(this.inputSubject);
  dataSource = new MatTableDataSource(this.getDisplayedModules());

  ngOnChanges() {
    this.inputedModules = this.getModuleDict(this.inputSubject);
    this.dataSource = new MatTableDataSource(this.getDisplayedModules());
  }

  constructor() {}

  moduleIsPassed(moduleName: string): boolean {
    let inputedModule = this.inputedModules[moduleName];
    if (inputedModule == undefined) {
      return false;
    }
    return inputedModule.grade != '';
  }

  private getDisplayedModules(): module[] {
    let allModules = this.getModuleArray(this.subject);

    // filter modules to display
    let displayedModules: module[] = [];
    allModules.forEach((m) => {
      if (
        (!this.showOnlyBA || m.ba != 'nein') &&
        (this.showPassed || !this.moduleIsPassed(m.name))
      ) {
        displayedModules.push(m);
      }
    });
    return displayedModules;
  }

  private getModuleArray(subject: subject): module[] {
    if (!subject) {
      return [];
    }
    return subject.modules.concat(subject.didaktik.concat(subject.wpfs));
  }

  private getModuleDict(subject: subject): { [key: string]: module } {
    let moduleDict: { [key: string]: module } = {};
    let moduleArray = this.getModuleArray(subject);
    moduleArray.forEach((ele) => {
      moduleDict[ele.name] = ele;
    });

    return moduleDict;
  }

  openModule() {}

  // copied from the input extension panel

  // TODO: create a service
  getTotalECTS() {
    let total: number = 0.0;
    this.subject.modules.forEach((m) => (total += m.ects));
    this.subject.didaktik.forEach((m) => (total += m.ects));
    total += this.subject.wpf_ects;
    return total;
  }

  // TODO: create a service
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

  // TODO: create a service
  getAvgGradeFachwissenschaft() {
    let modules = this.subject.modules.concat(this.subject.wpfs);
    return this.getAvgGrade(modules);
  }

  // TODO: create a service
  getAvgGradeDidaktik() {
    return this.getAvgGrade(this.subject.didaktik);
  }

  // TODO: create a service
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

  // TODO: create a service
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

  log() {
    console.log(this);
  }
}
