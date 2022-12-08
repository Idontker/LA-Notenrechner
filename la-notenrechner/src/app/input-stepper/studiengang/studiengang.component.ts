import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {DegreeSpecsService} from 'src/app/shared/degree-specs.service';
import {subject} from 'src/app/shared/models/subject';

@Component({
  selector: 'app-studiengang',
  templateUrl: './studiengang.component.html',
  styleUrls: ['./studiengang.component.scss'],
})
export class StudiengangComponent implements AfterViewInit {
  @Output()
  selectedDegree: string = '';
  @Output()
  selectedSubjects: string[] = [];
  selectedSubjectNames: string[] = [];

  /**
   * Used to be able to communicate with the parent component (which has access to the stepper)
   * Primarily used to signal the stepper to go to the next step, after importing the file
   */
  @Output()
  eventEmitter: EventEmitter<string> = new EventEmitter<string>();

  getDegrees(): string[] {
    return this.degSpec.getDegreeNames();
  }

  getDegreeSubjectCount(degree: string): number {
    return this.degSpec.getDegreeSubjectCount(degree);
  }

  getSubjects(degree: string): string[] {
    return this.degSpec.getSubjectNames(degree);
  }

  constructor(private degSpec: DegreeSpecsService) {
  }

  ngAfterViewInit() {
    //set drag and drop events
    let dndArea = document.getElementById('dnd-area');

    dndArea?.addEventListener('dragover', (e) => {
      e.stopPropagation();
      e.preventDefault();
      dndArea?.classList.add('dropping');
    });
    dndArea?.addEventListener('dragleave', (e) => {
      e.stopPropagation();
      e.preventDefault();
      dndArea?.classList.remove('dropping');
    });
    dndArea?.addEventListener('drop', (e) => {
      e.stopPropagation();
      e.preventDefault();
      dndArea?.classList.remove('dropping');

      //return, if no files available
      if (e.dataTransfer === null || e.dataTransfer.files.length === 0) {
        document.getElementById('uploadInfo')!.innerText =
          'Ein Fehler ist aufgetreten!';
        return;
      }

      this.uploadData(e.dataTransfer.files[0]);
    });
  }

  multiplePOVersionsAvailable(subjectName: string): boolean {
    let poVersionCount = 0;
    for (let key in this.degSpec.degrees[this.selectedDegree].subjects) {
      if (key.indexOf(subjectName) !== -1) poVersionCount++;
      if (poVersionCount > 1) return true;
    }
    return false;
  }

  getPOVersionsOfSubject(subjectName: string): number[] {
    let versions: number[] = []
    for (let key in this.degSpec.degrees[this.selectedDegree].subjects) {
      if (key.indexOf(subjectName) !== -1) versions.push(this.degSpec.degrees[this.selectedDegree].subjects[key].po);
    }
    return versions;
  }

  setSubjectSelection(index: number, subjectName: string) {
    this.selectedSubjectNames[index - 1] = subjectName
    if (!this.multiplePOVersionsAvailable(subjectName)) {
      this.selectedSubjects[index - 1] = subjectName;
    }
    console.log(this.selectedSubjectNames);
    console.log(this.selectedSubjects);
  }

  log(msg: any) {
    console.log(msg)
  }

  isNotSupported() {
    if (
      this.selectedDegree.indexOf('Mittelschule') != -1 ||
      this.selectedDegree.indexOf('Grundschule') != -1
    ) {
      return true;
    }
    return false;
  }

  completed(): boolean {
    if (!this.selectedDegree) {
      return false;
    }
    let n = this.getDegreeSubjectCount(this.selectedDegree);
    if (this.selectedSubjects.length != n) {
      return false;
    }

    for (let i = 0; i < n; i++) {
      //null: to check for empty slots
      if (this.selectedSubjects[i] == '' || this.selectedSubjects[i] == null) {
        return false;
      }
    }
    if (this.duplicatedSubject()) return false;

    //save selected degree name for later usage in exported file
    localStorage.setItem('degreeName', this.selectedDegree);
    return true;
  }

  range(start: number, end: number): number[] {
    var ans = [];
    for (let i = start; i <= end; i++) {
      ans.push(i);
    }
    return ans;
  }

  duplicatedSubject() {
    if (this.selectedSubjects.length == 0) {
      return false;
    }
    let n = this.getDegreeSubjectCount(this.selectedDegree);
    if (n <= 1) {
      return false;
    }
    let sub = this.selectedSubjects;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (sub[i] == sub[j] && sub[i] != '') {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Called from the import button, gets the file reference from the input element and starts uploading
   */
  uploadButton(): void {
    //get file list and check, if a file is available
    let files: FileList | null = (<HTMLInputElement>(
      document.getElementById('fileInput')
    )).files;
    if (files === null || files.length === 0) {
      document.getElementById('uploadInfo')!.innerText =
        'Ein Fehler ist aufgetreten!';
      return;
    }

    this.uploadData(files[0]);
  }

  /**
   * Reads the data from the given file, sets all required data and goes to next step in stepper.
   * @param file
   */
  uploadData(file: File): void {
    let infoDiv = document.getElementById('uploadInfo');

    //check for .json type
    if (!file.type || file.type !== 'application/json') {
      infoDiv!.innerText = 'Nur .json Dateien werden akzeptiert!';
      return;
    }

    //setup file reader with events
    let reader = new FileReader();
    reader.addEventListener('progress', (e) => {
      //displays file loading progress in percent
      infoDiv!.innerText = `${Math.round((e.loaded / e.total) * 100)} / 100 %`;
    });
    reader.addEventListener('loadend', () => {
      //check that file data is not binary (array, blob etc.)
      if (typeof reader.result !== 'string') {
        infoDiv!.innerText = 'Fehler beim Laden der Datei!';
        return;
      }

      //decode data to json
      let jsonData: any;
      try {
        jsonData = JSON.parse(reader.result);
      } catch (e) {
        infoDiv!.innerText = 'Datei ist nicht im json-Format!';
        return;
      }

      //set the degree name and override the degree spec with data from file
      console.log(this.degSpec.degrees);
      this.selectedDegree = jsonData.degreeName;

      //get subjects from json and degree subjects
      //as the json file contains only contains the selected subject values (the other options are lost during the steps and I don't want to search where),
      //each subject from the json file will override the subject in degree-spec and all not selected subject will be left untouched, so they are still available as select option
      let jsonSubjects: { [key: string]: subject } = jsonData.data.subjects;
      let degreeSubjects: { [key: string]: subject } =
        this.degSpec.degrees[this.selectedDegree].subjects;

      //loop through the subject key of the json subject
      let i = 0;
      for (let key in jsonSubjects) {
        //json has data for subject => override it and add name to select subjects
        this.selectedSubjects[i] = key;
        degreeSubjects[key] = jsonSubjects[key];

        i++;
      }

      //override the json subject with the current degree array
      jsonData.data.subjects = degreeSubjects;

      //now override the complete degree object with json data
      this.degSpec.degrees[this.selectedDegree] = jsonData.data;

      //emit data, which causes the stepper to go to the next step
      infoDiv!.innerText =
        'Du wirst zum nächsten Schritt weitergeleitet, bitte warten...';
      this.eventEmitter.emit('next'); //send data to parent (input-stepper)
    });

    //read file, which causes the above event to fire
    reader.readAsText(file);
  }
}
