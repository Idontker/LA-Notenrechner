import { Component, Input, OnChanges } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { DegreeCalculatorService } from 'src/app/shared/degree-calculator.service';
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
  @Input()
  ects!: number;

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

  constructor(private calc: DegreeCalculatorService) {}

  getPassedECTS() {
    return this.calc.getPassedECTS(this.subject);
  }

  getTotalECTS() {
    return this.ects;
  }

  getAvgGrade() {
    return this.calc.getAvgGrade(this.subject);
  }

}
