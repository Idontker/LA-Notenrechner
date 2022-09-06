import { Component, Input, OnInit } from '@angular/core';
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
  constructor() {}

  ngOnInit(): void {}
}
