import { Component, Input, OnChanges } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { DegreeCalculatorService } from 'src/app/shared/degree-calculator.service';
import { module } from 'src/app/shared/models/module';
import { subject } from 'src/app/shared/models/subject';

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
    this.dataSource = new MatTableDataSource(this.getAllModules());
  }

  displayedColumns = ['name', 'grade', 'ects'];
  dataSource = new MatTableDataSource(this.getAllModules());

  hidding(grade: any) {
    return grade == '';
  }

  private getAllModules(): module[] {
    if (!this.subject) {
      return [];
    }
    let sub = this.subject;
    return sub.modules.concat(sub.didaktik.concat(sub.wpfs));
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
