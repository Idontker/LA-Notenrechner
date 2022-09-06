import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudiengangComponent } from './studiengang/studiengang.component';
import { InputStepperComponent } from './input-stepper/input-stepper.component';
import { MaterialModule } from '../material/material.module';
import { LeistungenFachComponent } from './leistungen-fach/leistungen-fach.component';
import { FormsModule } from '@angular/forms';
import { GradePickerComponent } from './grade-picker/grade-picker.component';

@NgModule({
  declarations: [
    StudiengangComponent,
    InputStepperComponent,
    LeistungenFachComponent,
    GradePickerComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule],
})
export class InputStepperModule {}

export interface subject {
  name: string;
  stex: string[];
  wpf: number;
  didaktik: module[];
  modules: module[];
}

export interface module {
  name: string;
  ects: number;
  grade:
    | '1.0'
    | '1.3'
    | '1.7'
    | '2.0'
    | '2.3'
    | '2.7'
    | '3.0'
    | '3.3'
    | '3.7'
    | '4.0'
    | '4.3'
    | 'bestanden'
    | '';
  weight: number;
  ba: 'pflicht' | 'tauglich' | 'nein';
  options: string;
}

export const GRADES = [
  '1.0',
  '1.3',
  '1.7',
  '2.0',
  '2.3',
  '2.7',
  '3.0',
  '3.3',
  '3.7',
  '4.0',
  '4.3',
];
