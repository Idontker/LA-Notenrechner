import { Injectable } from '@angular/core';
import { module_item } from '../models/module_item';
import { stex_item } from '../models/stex_item';

@Injectable({
  providedIn: 'root',
})
export class ConfigBuilderService {
  constructor() {}

  buildObject(
    schulart: string,
    fachname: string,
    po: number,
    wpf_ects: number,
    stex_items: stex_item[],
    module_items: module_item[],
    didaktik_items: module_item[]
  ): object {
    let obj: any = {};
    // Fachname und Filename
    obj['name'] = fachname + '-' + po;
    obj['filename'] = 'la-' + schulart + '-' + fachname + '-' + po;

    // WPFs
    obj['wpf_ects'] = wpf_ects;
    obj['wpfs'] = [];

    // Stex
    let stex_arr: any[] = [];
    stex_items.forEach((stex_item) => {
      stex_arr.push({
        name: stex_item.name,
        weight: stex_item.weight,
        didaktik: stex_item.didaktik,
        grade: '',
      });
    });

    obj['stex'] = stex_arr;

    // Module
    let module_arr: any[] = [];
    module_items.forEach((module_item) => {
      module_arr.push({
        name: module_item.name,
        weight: module_item.weight,
        ects: module_item.ects,
        ba: module_item.ba,
        grade: '',
        options: '',
      });
    });

    obj['modules'] = module_arr;

    // Didaktik
    let didaktik_arr: any[] = [];
    didaktik_items.forEach((didaktik_item) => {
      didaktik_arr.push({
        name: didaktik_item.name,
        weight: didaktik_item.weight,
        ects: didaktik_item.ects,
        ba: didaktik_item.ba,
        grade: '',
        options: '',
      });
    });

    obj['didaktiks'] = didaktik_arr;

    return obj;
  }
}
