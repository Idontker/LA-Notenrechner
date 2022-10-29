import { Component, OnInit, ViewChild } from '@angular/core';
import {
  degree,
  DegreeSpecsService,
} from 'src/app/shared/degree-specs.service';
import { StudiengangComponent } from '../studiengang/studiengang.component';
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-input-stepper',
  templateUrl: './input-stepper.component.html',
  styleUrls: ['./input-stepper.component.scss'],
})
export class InputStepperComponent implements OnInit {
  @ViewChild(StudiengangComponent)
  private studiengang!: StudiengangComponent;

  /**
   * Reference to the stepper
   * @private
   */
  @ViewChild("stepper")
  private stepper!: MatStepper;

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

  /**
   * Called, whe the studiengang-component sends data via its eventEmitter
   * @param value value sent by the component
   */
  emitterCallback(value: string) {
    //"next" value to move to the next step
    //NOTE: the delay is used, as in testing a direct call would do nothing (because the current compoenent will be reloaded after the data changed)
    if (value === "next") setTimeout(() => this.stepper.next(), 500);
  }
}
