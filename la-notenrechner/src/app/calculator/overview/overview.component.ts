import { Component, OnInit } from '@angular/core';
import { degree, subject } from 'src/app/shared/degree-specs.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  // inputDegree shall be immutable
  inputDegree!: degree;
  inputedSubjects!: { [key: string]: subject };
  // can be mutated to change the values on demand
  degree!: degree;

  showPassed = true;
  showOnlyBA = false;

  constructor() {
    // pull data
    this.degree = this.getDegree();
    this.inputDegree = this.getInputDegree();

    // build inputedSubjects dictionary as  an helper for later
    let allInputedSubjects = this.getAllSubjects(this.inputDegree);
    this.inputedSubjects = {};
    allInputedSubjects.forEach((subject) => {
      this.inputedSubjects[subject.name] = subject;
    });
    console.log('constructor overview');
  }

  ngOnInit(): void {}

  log() {
    console.log(this);
  }

  getAllSubjects(degree: degree): subject[] {
    if (!degree) {
      return [];
    }
    let subjects = degree.subjects;
    let ret: subject[] = [];

    Object.keys(degree.subjects).forEach((key) => {
      ret.push(subjects[key]);
    });
    ret.push(degree.ews);
    ret.push(degree.others);

    return ret;
  }

  getInputDegree() {
    let objectString = localStorage.getItem('inputDegree');
    if (!objectString) {
      return null;
    }
    localStorage.setItem('degree', objectString);
    return JSON.parse(objectString);
  }

  getDegree() {
    let objectString = localStorage.getItem('degree');
    if (!objectString) {
      return null;
    }
    return JSON.parse(objectString);
  }
}
