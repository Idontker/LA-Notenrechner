import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studiengang',
  templateUrl: './studiengang.component.html',
  styleUrls: ['./studiengang.component.scss'],
})
export class StudiengangComponent {
  selectedDegree: string = '';
  selectedSubject: string[] = [];

  degrees: { [key: string]: { subjects: string[]; n: number } } = {
    'Lehramt Gymnasium': {
      subjects: ['Informatik', 'Mathematik', 'Englisch'],
      n: 2,
    },
    'Lehramt Realschule': {
      subjects: ['Informatik', 'Mathematik', 'Englisch'],
      n: 2,
    },
    'Lehramt Mittelschule': {
      subjects: ['Informatik', 'Mathematik', 'Englisch'],
      n: 1,
    },
  };

  getStudies(): string[] {
    return Object.keys(this.degrees);
  }

  getFachCount(degree: string): number {
    if (this.degrees[degree]) {
      return this.degrees[degree].n;
    }
    return 0;
  }

  getSubjects(degree: string): string[] {
    if (this.degrees[degree]) {
      return this.degrees[degree].subjects;
    }
    return [];
  }

  constructor() {}

  completed(): boolean {
    return false;
  }

  range(start: number, end: number): number[] {
    var ans = [];
    for (let i = start; i <= end; i++) {
      ans.push(i);
    }
    return ans;
  }

  log() {
    console.log(this);
  }

  duplicatedSubject() {
    console.log(this);
    let n = this.getFachCount(this.selectedDegree);
    if (n <= 1) {
      console.log('false n<=1');
      return false;
    }
    let sub = this.selectedSubject;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        console.log(sub[i], sub[j], i, j);
        if (sub[i] == sub[j] && sub[i] != '') {
          console.log(true);
          return true;
        }
      }
    }
    console.log(false);
    return false;
  }
}
