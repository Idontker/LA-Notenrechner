import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateStexComponent } from './create-stex/create-stex.component';
import { CreateConfigComponent } from './create-config.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { CreateModuleComponent } from './create-module/create-module.component';

export interface stex_item {
  name: string;
  weight: number;
  didaktik: boolean;
}

export interface modul_item {
  name: string;
  ects: number;
  weight: number;
  ba: 'pflicht' | 'tauglich' | 'nein';
}

@NgModule({
  declarations: [CreateConfigComponent, CreateStexComponent, CreateModuleComponent],
  imports: [CommonModule, MaterialModule, FormsModule, SharedModule],
})
export class CreateConfigModule {}
