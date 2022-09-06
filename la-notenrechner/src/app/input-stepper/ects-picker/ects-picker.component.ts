import { Component, Input, OnInit } from '@angular/core';
import { ECTS, module } from '../input-stepper.module';

@Component({
  selector: 'app-ects-picker',
  templateUrl: './ects-picker.component.html',
  styleUrls: ['./ects-picker.component.scss'],
})
export class EctsPickerComponent implements OnInit {
  @Input()
  module!: module;

  ects = ECTS;

  constructor() {}

  ngOnInit(): void {}
}
