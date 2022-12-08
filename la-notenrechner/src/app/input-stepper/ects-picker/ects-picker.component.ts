import { Component, Input, OnInit } from '@angular/core';
import { ECTS } from 'src/app/shared/degree-specs.service';
import { module } from 'src/app/shared/models/module';

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
