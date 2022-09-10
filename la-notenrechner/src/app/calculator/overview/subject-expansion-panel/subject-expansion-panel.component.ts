import { Component, Input, OnChanges } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { DegreeCalculatorService } from 'src/app/shared/degree-calculator.service';
import { GRADES, module, subject } from 'src/app/shared/degree-specs.service';

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
  stexMode!: boolean;
  @Input()
  ects!: number;

  displayedColumns = ['name', 'grade', 'ects'];
  GRADES = GRADES.concat(['']);

  inputedModules = this.getModuleDict(this.inputSubject);
  dataSource = new MatTableDataSource(this.getDisplayedModules());

  ngOnChanges() {
    this.inputedModules = this.getModuleDict(this.inputSubject);
    this.dataSource = new MatTableDataSource(this.getDisplayedModules());
  }

  constructor(private calc: DegreeCalculatorService) {}

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
        (this.stexMode || m.ba != 'nein') &&
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

  getPassedECTS() {
    return this.calc.getPassedECTS(this.subject, this.stexMode);
  }

  getTotalECTS() {
    return this.ects;
  }

  getAvgGrade() {
    return this.calc.getAvgGrade(this.subject, this.stexMode);
  }

  getBestGrade() {
    return this.calc.getAvgGrade(this.subject, this.stexMode, 1);
  }

  getWorstGrade() {
    return this.calc.getAvgGrade(this.subject, this.stexMode, 4);
  }

  log() {
    console.log(this);
  }
}
