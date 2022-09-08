import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudiengangComponent } from './studiengang/studiengang.component';
import { InputStepperComponent } from './input-stepper/input-stepper.component';
import { MaterialModule } from '../material/material.module';
import { LeistungenFachComponent } from './leistungen-fach/leistungen-fach.component';
import { FormsModule } from '@angular/forms';
import { EctsPickerComponent } from './ects-picker/ects-picker.component';
import { InputOverviewComponent } from './input-overview/input-overview.component';
import { SubjectExpensionPanelComponent } from './input-overview/subject-expension-panel/subject-expension-panel.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    StudiengangComponent,
    InputStepperComponent,
    LeistungenFachComponent,
    EctsPickerComponent,
    InputOverviewComponent,
    SubjectExpensionPanelComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, SharedModule],
})
export class InputStepperModule {}
