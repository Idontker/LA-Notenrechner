import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradePickerComponent } from './grade-picker/grade-picker.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [GradePickerComponent],
  exports: [GradePickerComponent],
  imports: [CommonModule, MaterialModule, FormsModule],
})
export class SharedModule {}
