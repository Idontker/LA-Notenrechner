import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { module_item } from '../models/module_item';

@Component({
  selector: 'app-create-module',
  templateUrl: './create-module.component.html',
  styleUrls: ['./create-module.component.scss'],
})
export class CreateModuleComponent implements OnInit {
  @Input()
  didaktik: boolean = false;

  form = new FormGroup({
    module: new FormArray([]),
  });
  constructor() {}

  ngOnInit(): void {
    this.addModuleElement();
  }

  get module() {
    return this.form.get('module') as FormArray;
  }

  onFormSubmit(): void {
    for (let i = 0; i < this.module.length; i++) {
      console.log(this.module.at(i).value);
    }
  }

  addModuleElement() {
    this.module.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        weight: new FormControl('1', [
          Validators.required,
          Validators.min(0),
          Validators.pattern('[0-9]*'),
        ]),
        ects: new FormControl('0', Validators.pattern('[0-9]*(|\\.5)')),
        ba: new FormControl('pflicht', Validators.required),
      })
    );
  }

  deleteForm(idx: number) {
    this.module.removeAt(idx);
  }

  public getItems(): module_item[] {
    let arr: module_item[] = [];
    for (let i = 0; i < this.module.controls.length; i++) {
      let values = this.module.at(i).value;

      let object: module_item = {
        name: values['name'],
        weight: values['weight'],
        ects: values['ects'],
        ba: values['ba'],
      };
      arr.push(object);
    }

    return arr;
  }

  public isInvalid() {
    return this.form.invalid;
  }

  public formFehler() {
    let arr: any[] = [];
    for (let i = 0; i < this.module.controls.length; i++) {
      let control = this.module.at(i);

      if (control.invalid) {
        let tmp = '';

        if (control.get('name')?.invalid) {
          tmp += ', Modulename';
        }
        if (control.get('weight')?.invalid) {
          tmp += ', Gewichtung';
        }
        if (control.get('ects')?.invalid) {
          tmp += ', ECTS';
        }
        if (control.get('ba')?.invalid) {
          tmp += ', Einstellung zur BA-Einbringung';
        }

        // remove first comma
        tmp = tmp.slice(1);
        arr.push(tmp);
      }
    }
    return arr;
  }
}
