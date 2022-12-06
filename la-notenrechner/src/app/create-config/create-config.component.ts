import { Component, OnInit } from '@angular/core';
import { modul_item, stex_item } from './create-config.module';

@Component({
  selector: 'app-create-config',
  templateUrl: './create-config.component.html',
  styleUrls: ['./create-config.component.scss'],
})
export class CreateConfigComponent implements OnInit {
  fachname = '';
  // prüfungsordnung
  po = '20XX';
  schulart: 'gs' | 'ms' | 'rs' | 'gym' = 'gs';
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
