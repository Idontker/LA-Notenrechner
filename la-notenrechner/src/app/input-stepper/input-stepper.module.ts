import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudiengangComponent } from './studiengang/studiengang.component';
import { InputStepperComponent } from './input-stepper/input-stepper.component';
import { MaterialModule } from '../material/material.module';
import { LeistungenFachComponent } from './leistungen-fach/leistungen-fach.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StudiengangComponent,
    InputStepperComponent,
    LeistungenFachComponent,
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
  grade: string;
  weight: number;
  ba: 'pflicht' | 'tauglich' | 'nein';
  options: string;
}
