import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { FormsModule } from '@angular/forms';
import { SubjectExpansionPanelComponent } from './overview/subject-expansion-panel/subject-expansion-panel.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [OverviewComponent, SubjectExpansionPanelComponent],
  // declarations: [OverviewComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
})
export class CalculatorModule {}
