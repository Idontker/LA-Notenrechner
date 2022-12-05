import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputStepperModule } from './input-stepper/input-stepper.module';
import { CalculatorModule } from './calculator/calculator.module';
import { SharedModule } from './shared/shared.module';
import { CreateConfigComponent } from './create-config/create-config.component';

@NgModule({
  declarations: [AppComponent, CreateConfigComponent],
  imports: [BrowserModule, InputStepperModule, CalculatorModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
