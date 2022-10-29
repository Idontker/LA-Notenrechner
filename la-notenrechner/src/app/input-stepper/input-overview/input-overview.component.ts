import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DegreeCalculatorService } from 'src/app/shared/degree-calculator.service';
import { degree, subject } from 'src/app/shared/degree-specs.service';

@Component({
  selector: 'app-input-overview',
  templateUrl: './input-overview.component.html',
  styleUrls: ['./input-overview.component.scss'],
})
export class InputOverviewComponent implements OnInit {
  @Input()
  degree: degree | undefined;

  getAllSubjects(): subject[] {
    if (!this.degree) {
      return [];
    }
    let subjects = this.degree.subjects;
    let ret: subject[] = [];

    Object.keys(this.degree.subjects).forEach((key) => {
      ret.push(subjects[key]);
    });
    ret.push(this.degree.ews);
    ret.push(this.degree.others);

    return ret;
  }

  handleDoneEvent() {
    localStorage.removeItem('degree');
    localStorage.setItem('degree', JSON.stringify(this.degree));
    localStorage.removeItem('inputDegree');
    localStorage.setItem('inputDegree', JSON.stringify(this.degree));
    this.router.navigate(['/calc']);
  }

  constructor(private router: Router, private calc: DegreeCalculatorService) {}

  ngOnInit(): void {}

  getTotalECTS(subject: subject): number {
    if (this.degree == undefined) {
      return 0;
    }
    return this.calc.getTotalECTS(this.degree, subject, true);
  }

  /**
   * Causes the browser to download a .json file with all the entered data
   */
  downloadData(): void {
    //create a blob with the given data encoded in json
    let blobObj: Blob = new Blob([JSON.stringify({
      data: this.degree,//dump all data for the current degree
      degreeName: localStorage.getItem("degreeName")//will be set in first step, after selecting the degree
    })], {type: "application/json;charset=utf-8;"});

    //create an <a> link element (will be clicked later to download the file)
    let linkObj: HTMLAnchorElement = document.createElement("a");
    linkObj.setAttribute("download", "notenrechner-export-" + Date.now() + ".json");//download attribute with filename
    linkObj.style.display = "none";
    linkObj.href = window.URL.createObjectURL(blobObj);//creat data url and set it to the link

    //add the (invisible) link element to the body, click it (starts the download) and remove it again
    document.body.appendChild(linkObj);
    linkObj.click();
    document.body.removeChild(linkObj);

    //revoke the url, to free-up resources
    window.URL.revokeObjectURL(linkObj.href);
  }
}
