import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputStepperComponent } from './input-stepper/input-stepper/input-stepper.component';

const routes: Routes = [{ path: '', component: InputStepperComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
