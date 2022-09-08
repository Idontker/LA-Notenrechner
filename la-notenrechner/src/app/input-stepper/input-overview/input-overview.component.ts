import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DegreeCalculatorService } from 'src/app/shared/degree-calculator.service';
import { degree, subject } from 'src/app/shared/degree-specs.service';

@Component({
  selector: 'app-input-overview',
  templateUrl: './input-overview.component.html',
  styleUrls: ['./input-overview.component.scss'],
})
export class InputOverviewComponent implements OnInit {
  @Input()
  degree: degree | undefined;

  getAllSubjects(): subject[] {
    if (!this.degree) {
      return [];
    }
    let subjects = this.degree.subjects;
    let ret: subject[] = [];

    Object.keys(this.degree.subjects).forEach((key) => {
      ret.push(subjects[key]);
    });
    ret.push(this.degree.ews);
    ret.push(this.degree.others);

    return ret;
  }

  handleDoneEvent() {
    localStorage.removeItem('degree');
    localStorage.setItem('degree', JSON.stringify(this.degree));
    localStorage.removeItem('inputDegree');
    localStorage.setItem('inputDegree', JSON.stringify(this.degree));
    this.router.navigate(['/calc']);
  }

  constructor(private router: Router, private calc: DegreeCalculatorService) {}

  ngOnInit(): void {}

  getTotalECTS(subject: subject): number {
    if (this.degree == undefined) {
      return 0;
    }
    return this.calc.getTotalECTS(this.degree, subject, true);
  }
}
