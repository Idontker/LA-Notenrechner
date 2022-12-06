import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { stex_item } from '../create-config.module';

@Component({
  selector: 'app-create-stex',
  templateUrl: './create-stex.component.html',
  styleUrls: ['./create-stex.component.scss'],
})
export class CreateStexComponent implements OnInit {
  // stex: stex_item[] = [{ name: '', weight: 1, didaktik: false }];

  form = this.fb.group({
    stex: this.fb.array([]),

    lessons: this.fb.array([]),
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  get stex() {
    return this.form.controls['stex'] as FormArray;
  }

  addStexElement() {
    // this.stex.push({
    //   name: '',
    //   weight: 1,
    //   didaktik: false,
    // });

    const stexForm = this.fb.group({
      name: ['', Validators.required],
      weight: ['1', [Validators.required, Validators.min(0)]],
      didaktik: [false, Validators.required],
    });

    this.stex.push(stexForm);
  }

  deleteForm(idx: number) {
    this.stex.removeAt(idx);
  }
  log(idx: number) {
    console.log(this.stex.at(idx));
  }
}
