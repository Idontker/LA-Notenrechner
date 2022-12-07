import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DownloadConfigService {
  constructor() {}

  saveConfigAsJSON(filename: string, obj: object) {
    let blobObj: Blob = new Blob([JSON.stringify(obj)], {
      type: 'application/json;charset=utf-8;',
    });

    //create an <a> link element (will be clicked later to download the file)
    let linkObj: HTMLAnchorElement = document.createElement('a');
    linkObj.setAttribute('download', filename + '.json'); //download attribute with filename
    linkObj.style.display = 'none';
    linkObj.href = window.URL.createObjectURL(blobObj); //creat data url and set it to the link

    //add the (invisible) link element to the body, click it (starts the download) and remove it again
    document.body.appendChild(linkObj);
    linkObj.click();
    document.body.removeChild(linkObj);

    //revoke the url, to free-up resources
    window.URL.revokeObjectURL(linkObj.href);
  }
}
