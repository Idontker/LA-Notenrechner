import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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
        ects: new FormControl('0', Validators.pattern('[0-9]*(.5)')),
        ba: new FormControl('pflicht', Validators.required),
      })
    );
  }

  deleteForm(idx: number) {
    this.module.removeAt(idx);
  }
}
