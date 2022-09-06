import { Component, Input, OnInit } from '@angular/core';
import { GRADES, module } from '../input-stepper.module';

@Component({
  selector: 'app-grade-picker',
  templateUrl: './grade-picker.component.html',
  styleUrls: ['./grade-picker.component.scss'],
})
export class GradePickerComponent implements OnInit {
  @Input()
  module!: module;

  grades = GRADES;

  constructor() {}

  ngOnInit(): void {}
}
