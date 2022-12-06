import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { InputStepperModule } from './input-stepper/input-stepper.module';
import { CalculatorModule } from './calculator/calculator.module';
import { SharedModule } from './shared/shared.module';
import { CreateConfigModule } from './create-config/create-config.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // CreateConfigModule,
    SharedModule,
    BrowserModule,
    InputStepperModule,
    CalculatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
