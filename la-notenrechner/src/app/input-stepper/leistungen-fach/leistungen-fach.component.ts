import { Component, Input, OnInit } from '@angular/core';
import { DegreeSpecsService } from 'src/app/shared/degree-specs.service';
import { module, subject } from '../input-stepper.module';

@Component({
  selector: 'app-leistungen-fach',
  templateUrl: './leistungen-fach.component.html',
  styleUrls: ['./leistungen-fach.component.scss'],
})
export class LeistungenFachComponent implements OnInit {
  @Input('degreeName')
  degreeName: string = '';
  @Input('subjectName')
  subjectName: string = '';

  wpfs: module[] = [];

  ects = [2.5, 5, 7.5, 10];

  constructor(private degSpec: DegreeSpecsService) {}

  ngOnInit(): void {}

  completed(): boolean {
    if (this.getSubjectConfig()?.wpf == 0) {
      return true;
    }
    for (let i = 0; i < this.wpfs.length; i++) {
      let wpf = this.wpfs[i];
      if (wpf.name == '' || wpf.grade == '' || wpf.ects == 0) {
        return false;
      }
    }
    return true;
  }

  getSubjectConfig(): subject | undefined {
    return this.degSpec.getSubjectObject(this.degreeName, this.subjectName);
  }

  addWPF() {
    let module: module = {
      name: '',
      ects: 0,
      grade: '',
      weight: 1,
      ba: 'tauglich',
      options: '',
    };
    this.wpfs.push(module);
  }

  deleteWPF(i: number) {
    console.log(this.wpfs.splice(i, 1));
  }

  log(event: any) {
    console.log(event);
  }

  logMe() {
    console.log(this);
  }
}
