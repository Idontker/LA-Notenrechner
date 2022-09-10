import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { FormsModule } from '@angular/forms';
import { SubjectExpansionPanelComponent } from './overview/subject-expansion-panel/subject-expansion-panel.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { StexExpanelComponent } from './overview/stex-expanel/stex-expanel.component';
import { StaatsnoteTableComponent } from './overview/staatsnote-table/staatsnote-table.component';

@NgModule({
  declarations: [OverviewComponent, SubjectExpansionPanelComponent, StexExpanelComponent, StaatsnoteTableComponent],
  // declarations: [OverviewComponent],
  imports: [CommonModule, MaterialModule, FormsModule, SharedModule],
})
export class CalculatorModule {}
