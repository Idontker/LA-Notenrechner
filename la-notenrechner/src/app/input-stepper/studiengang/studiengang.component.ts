import { Component, OnInit, Output } from '@angular/core';
import { DegreeSpecsService } from 'src/app/shared/degree-specs.service';

@Component({
  selector: 'app-studiengang',
  templateUrl: './studiengang.component.html',
  styleUrls: ['./studiengang.component.scss'],
})
export class StudiengangComponent {
  @Output()
  selectedDegree: string = '';
  @Output()
  selectedSubjects: string[] = [];

  getDegrees(): string[] {
    return this.degSpec.getDegreeNames();
  }

  getDegreeSubjectCount(degree: string): number {
    return this.degSpec.getDegreeSubjectCount(degree);
  }

  getSubjects(degree: string): string[] {
    return this.degSpec.getSubjectNames(degree);
  }

  constructor(private degSpec: DegreeSpecsService) {}

  completed(): boolean {
    if (!this.selectedDegree) {
      return false;
    }
    let n = this.getDegreeSubjectCount(this.selectedDegree);
    if (this.selectedSubjects.length != n) {
      return false;
    }

    for (let i = 0; i < n; i++) {
      if (this.selectedSubjects[i] == '') {
        return false;
      }
    }

    return this.duplicatedSubject() == false;
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
    if (this.selectedSubjects.length == 0) {
      return false;
    }
    let n = this.getDegreeSubjectCount(this.selectedDegree);
    if (n <= 1) {
      return false;
    }
    let sub = this.selectedSubjects;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (sub[i] == sub[j] && sub[i] != '') {
          return true;
        }
      }
    }
    return false;
  }
}
