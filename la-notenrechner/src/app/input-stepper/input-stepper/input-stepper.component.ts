import { Component, OnInit, ViewChild } from '@angular/core';
import {
  degree,
  DegreeSpecsService,
} from 'src/app/shared/degree-specs.service';
import { StudiengangComponent } from '../studiengang/studiengang.component';

@Component({
  selector: 'app-input-stepper',
  templateUrl: './input-stepper.component.html',
  styleUrls: ['./input-stepper.component.scss'],
})
export class InputStepperComponent implements OnInit {
  @ViewChild(StudiengangComponent)
  private studiengang!: StudiengangComponent;

  constructor(private degSpec: DegreeSpecsService) {}

  ngOnInit(): void {}

  getSelectedDegree(): string {
    if (this.studiengang) {
      return this.studiengang.selectedDegree;
    }
    return '';
  }
  getSelectedSubjects(): string[] {
    if (this.studiengang && this.studiengang.selectedSubjects.length != 0) {
      return this.studiengang.selectedSubjects;
    }
    return [];
  }

  getDegreeObject(): degree | undefined {
    return this.degSpec.getDegreeObject(
      this.getSelectedDegree(),
      this.getSelectedSubjects()
    );
  }
}
