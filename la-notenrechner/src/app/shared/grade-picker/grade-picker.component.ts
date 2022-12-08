import { Component, Input, OnInit } from '@angular/core';
import { GRADES } from '../models/grades';
import { module } from '../models/module';

@Component({
  selector: 'app-grade-picker',
  templateUrl: './grade-picker.component.html',
  styleUrls: ['./grade-picker.component.scss'],
})
export class GradePickerComponent implements OnInit {
  @Input('module')
  module!: module;

  grades = GRADES;

  constructor() {}

  ngOnInit(): void {}
}
