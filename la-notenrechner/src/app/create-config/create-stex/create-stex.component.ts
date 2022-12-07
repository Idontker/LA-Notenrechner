import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { stex_item } from '../create-config.module';

@Component({
  selector: 'app-create-stex',
  templateUrl: './create-stex.component.html',
  styleUrls: ['./create-stex.component.scss'],
})
export class CreateStexComponent implements OnInit {
  // stex: stex_item[] = [{ name: '', weight: 1, didaktik: false }];

  form = new FormGroup({
    stex: new FormArray([]),
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addStexElement();
  }

  get stex() {
    return this.form.get('stex') as FormArray;
  }

  onFormSubmit(): void {
    for (let i = 0; i < this.stex.length; i++) {
      console.log(this.stex.at(i).value);
    }
  }

  addStexElement() {
    this.stex.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        weight: new FormControl('1', [
          Validators.required,
          Validators.min(0),
          Validators.pattern('[0-9]*'),
        ]),
        didaktik: new FormControl(false, Validators.required),
      })
    );
  }

  isDidaktikExamen(idx: number) {
    return this.stex.at(idx).value['didaktik'];
  }

  deleteForm(idx: number) {
    this.stex.removeAt(idx);
  }

  log(idx: number) {
    console.log(this.stex.at(idx), (<FormGroup>this.stex.at(idx))?.value);
  }
}
