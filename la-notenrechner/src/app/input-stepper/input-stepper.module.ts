import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudiengangComponent } from './studiengang/studiengang.component';
import { InputStepperComponent } from './input-stepper/input-stepper.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [StudiengangComponent, InputStepperComponent],
  imports: [CommonModule, MaterialModule],
})
export class InputStepperModule {}
