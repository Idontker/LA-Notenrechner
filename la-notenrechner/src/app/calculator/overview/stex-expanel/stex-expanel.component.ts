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
  degree!: degree;

  GRADES = ['1', '2', '3', '4', '5', '6'];

  displayedColumns = ['name', 'grade'];

  dataSource = new MatTableDataSource(this.getAllStex());

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.getAllStex());
  }

  getAllStex(): any[] {
    if (!this.degree) {
      return [];
    }

    let ret: any[] = [];
    Object.keys(this.degree.subjects).forEach((key) => {
      let subject = this.degree.subjects[key];
      subject.stex.forEach((examen) => {
        ret.push(examen);
      });
    });
    this.degree.ews.stex.forEach((examen) => {
      ret.push(examen);
    });

    return ret;
  }

  constructor(private ren: Renderer2) {}

  checkToggleOff(button: any, examen: any) {
    const oldValue = examen.grade;
    setTimeout(() => {
      if (oldValue != '' && oldValue === button.value) {
        button.checked = false;
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-focused'
        );
        this.ren.removeClass(
          button['_elementRef'].nativeElement,
          'cdk-program-focused'
        );
        examen.grade = '';
      }
    });
  }
}
