import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GradePickerComponent } from './grade-picker/grade-picker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InformationPopUpComponent } from './information-pop-up/information-pop-up.component';
import { HttpClientModule } from '@angular/common/http';
// import { ExporterComponent } from './exporter/exporter.component';

@NgModule({
  declarations: [
    GradePickerComponent,
    NavBarComponent,
    InformationPopUpComponent,
    // ExporterComponent
  ],
  exports: [
    GradePickerComponent,
    NavBarComponent,
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class SharedModule {}
