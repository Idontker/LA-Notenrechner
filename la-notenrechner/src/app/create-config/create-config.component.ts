import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { modul_item, stex_item } from './create-config.module';

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

@Component({
  selector: 'app-create-config',
  templateUrl: './create-config.component.html',
  styleUrls: ['./create-config.component.scss'],
})
export class CreateConfigComponent implements OnInit {
  form = new FormGroup({
    schulart: new FormControl('gs'),
    fachname: new FormControl('', Validators.required),
    // prüfungsordnung
    po: new FormControl('20XX', [
      Validators.required,
      Validators.pattern('20[0-9][0-9]'),
    ]),
    wpf_ects: new FormControl('0', Validators.pattern('[0-9]*(.5)')),
  });

  log() {
    console.log(this.form.value);
  }

  // schulart: 'gs' | 'ms' | 'rs' | 'gym' = 'gs';
  wpf_ects: number = 0.0;

  ba_panel_open = true;

  didaktik: modul_item[] = [
    {
      name: '',
      ects: 5,
      weight: 1,
      ba: 'pflicht',
    },
  ];
  module: modul_item[] = [
    {
      name: '',
      ects: 5,
      weight: 1,
      ba: 'pflicht',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  addModuleItem() {
    this.module.push({
      name: '',
      weight: 1,
      ects: 5.0,
      ba: 'pflicht',
    });
  }
}
