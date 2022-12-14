import { Component, Inject, isDevMode, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-information-pop-up',
  templateUrl: './information-pop-up.component.html',
  styleUrls: ['./information-pop-up.component.scss'],
})
export class InformationPopUpComponent implements OnInit {
  okayButtonString: string = 'Okay';
  header: string = '';
  text: string = '';
  isSuccessData = true;

  constructor(
    private dialogRef: MatDialogRef<InformationPopUpComponent>,
    @Inject(MAT_DIALOG_DATA)
    private data: { header: string; text: string; isSuccessData: boolean }
  ) {
    if (isDevMode()) {
      this.okayButtonString = 'Aye!';
    }
    this.header = data.header;
    this.text = data.text;
    this.isSuccessData = data.isSuccessData;
    // if (isDevMode()) {
    // console.log('Create info popup');
    // console.log(this.isSuccessData);
    // console.log(data.text);
    // console.log(data.header);
    // }
  }
  close() {
    if (isDevMode()) console.log('close window');
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
