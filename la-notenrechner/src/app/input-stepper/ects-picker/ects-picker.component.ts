import { Component, Input, OnInit } from '@angular/core';
import { ECTS, module } from 'src/app/shared/degree-specs.service';

@Component({
  selector: 'app-ects-picker',
  templateUrl: './ects-picker.component.html',
  styleUrls: ['./ects-picker.component.scss'],
})
export class EctsPickerComponent implements OnInit {
  @Input('module')
  module!: module;

  ects = ECTS;

  constructor() {}

  ngOnInit(): void {}
}
