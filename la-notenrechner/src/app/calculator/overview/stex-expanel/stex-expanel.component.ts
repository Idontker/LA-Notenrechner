import { Component, Input, OnChanges, Renderer2 } from '@angular/core';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { degree, subject } from 'src/app/shared/degree-specs.service';

@Component({
  selector: 'app-stex-expanel',
  templateUrl: './stex-expanel.component.html',
  styleUrls: ['./stex-expanel.component.scss'],
  viewProviders: [MatExpansionPanel],
})
export class StexExpanelComponent implements OnChanges {
  @Input()
  set degree(degree: degree) {
    this._degree = degree;
    Object.keys(degree.subjects).forEach((key: string) => {
      let subject: subject = degree.subjects[key];
      this.stexpruefungen = this.stexpruefungen.concat(subject.stex);
    });
    this.stexpruefungen.concat(degree.ews.stex);
    console.log(degree, this.stexpruefungen);

    // grades anlegen
    this.stexpruefungen.forEach((name: string) => {
      if (!this.stex_grades[name]) {
        this.stex_grades[name] = '';
      }
    });
  }
  _degree!: degree;

  stexpruefungen: string[] = [];
  stex_grades: { [key: string]: '1' | '2' | '3' | '4' | '5' | '6' | '' } = {};
  GRADES = ['1', '2', '3', '4', '5', '6'];

  displayedColumns = ['name', 'grade'];

  dataSource = new MatTableDataSource(this.stexpruefungen);

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.stexpruefungen);
  }
  constructor(private ren: Renderer2) {}

  log() {
    console.log(this);
  }

  checkToggleOff(el: any, examName: string) {
    const oldValue = this.stex_grades[examName];
    setTimeout(() => {
      if (oldValue != '' && oldValue === el.value) {
        el.checked = false;
        this.ren.removeClass(el['_elementRef'].nativeElement, 'cdk-focused');
        this.ren.removeClass(
          el['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
        this.stex_grades[examName] = '';
      }
    });
  }
}
