import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfigBuilderService } from './controller/config-builder.service';
import { DownloadConfigService } from './controller/download-config.service';
import { CreateModuleComponent } from './create-module/create-module.component';
import { CreateStexComponent } from './create-stex/create-stex.component';

@Component({
  selector: 'app-create-config',
  templateUrl: './create-config.component.html',
  styleUrls: ['./create-config.component.scss'],
})
export class CreateConfigComponent implements AfterViewInit {
  form = new FormGroup({
    schulart: new FormControl('gs'),
    fachname: new FormControl('', Validators.required),
    // prüfungsordnung
    po: new FormControl('20XX', [
      Validators.required,
      Validators.pattern('20[0-9][0-9]'),
    ]),
    wpf_ects: new FormControl('0', Validators.pattern('[0-9]*(|\\.5)')),
  });

  @ViewChild('create_stex')
  create_stex!: CreateStexComponent;
  @ViewChild('create_module')
  create_module!: CreateModuleComponent;
  @ViewChild('create_didaktik')
  create_didaktik!: CreateModuleComponent;

  log() {
    console.log(this.form.value);
  }

  // schulart: 'gs' | 'ms' | 'rs' | 'gym' = 'gs';
  wpf_ects: number = 0.0;

  ba_panel_open = true;
  constructor(
    private builder: ConfigBuilderService,
    private saver: DownloadConfigService
  ) {}

  ngAfterViewInit(): void {
    this.formNotValid = this._formNotValid;
  }

  onSubmit() {
    let obj: object = this.buildConfigObject();
    this.saveConfigObject(obj);
  }

  buildConfigObject() {
    let controls = this.form.controls;

    // casting in order to fix cases, when controls are not accessible
    let schulart = controls.schulart.value as any as string;
    let fachname = controls.fachname.value as any as string;
    let po = controls.po.value as any as number;
    let wpf_ects = controls.wpf_ects.value as any as number;

    return this.builder.buildObject(
      schulart,
      fachname,
      po,
      wpf_ects,
      this.create_stex.getItems(),
      this.create_module.getItems(),
      this.create_didaktik.getItems()
    );
  }

  saveConfigObject(obj: any) {
    console.log(obj);
    // this.saver.saveConfigAsJSON(obj['filename'], obj);
    // TODO: remove testing filename
    this.saver.saveConfigAsJSON('constant-filename', obj);
  }

  formNotValid() {
    // dummy will be replaced after ngAfterViewInit
    return true;
  }

  private _formNotValid() {
    return (
      this.form.invalid ||
      this.create_stex?.isInvalid() ||
      this.create_module?.isInvalid() ||
      this.create_didaktik?.isInvalid()
    );
  }

  allgemeineFormFehler() {
    let locations: any[] = [];

    if (this.form.controls.schulart.valid == false) {
      locations.push('Schulart');
    }
    if (this.form.controls.fachname.valid == false) {
      locations.push('Fachnamen');
    }
    if (this.form.controls.po.valid == false) {
      locations.push('Prüfungsordnung');
    }
    if (this.form.controls.wpf_ects.valid == false) {
      locations.push('ECTS Angabe für den Wahlpflichtbereich');
    }
    return locations;
  }
}
