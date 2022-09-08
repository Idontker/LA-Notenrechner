import { Component, Input, OnInit } from '@angular/core';
import { GRADES, module } from 'src/app/shared/degree-specs.service';

@Component({
  selector: 'app-grade-picker',
  templateUrl: './grade-picker.component.html',
  styleUrls: ['./grade-picker.component.scss'],
})
export class GradePickerComponent implements OnInit {
  @Input('module')
  _module!: module;
  // set module(module: any) {
  //   console.log('set: ', module);
  //   this._module = module;
  // }

  grades = GRADES;

  constructor() {}

  ngOnInit(): void {}
}
