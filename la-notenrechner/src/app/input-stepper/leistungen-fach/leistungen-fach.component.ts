import { Component, Input, OnInit } from '@angular/core';
import { DegreeSpecsService } from 'src/app/shared/degree-specs.service';
import { module } from 'src/app/shared/models/module';
import { subject } from 'src/app/shared/models/subject';

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

  constructor(private degSpec: DegreeSpecsService) {}

  ngOnInit(): void {}

  completed(): boolean {
    let subject = this.getSubjectConfig();
    if (!subject) {
      return false;
    }
    if (subject.wpf_ects == 0) {
      return true;
    }

    let wpfs = subject.wpfs;
    for (let i = 0; i < wpfs.length; i++) {
      let wpf = wpfs[i];
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
    this.getSubjectConfig()?.wpfs.push(module);
  }

  deleteWPF(i: number) {
    console.log(this.getSubjectConfig()?.wpfs.splice(i, 1));
  }
}
