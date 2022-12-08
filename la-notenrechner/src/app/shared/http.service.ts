import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InformationPopUpComponent } from './information-pop-up/information-pop-up.component';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public silent = false;

  constructor(public dialogRef: MatDialog, private http: HttpClient) {}

  /**
   *
   * @param processName
   * @param path
   * @param method
   * @param params
   * @param data not used if method == "GET"
   */
  public jsonRequest(
    processName: string,
    path: string,
    method: 'GET' | 'POST',
    params?: HttpParams,
    data?: any
  ): Promise<any> {
    const jsonHeaders = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );
    if (data && method == 'POST') {
      data = JSON.stringify(data);
    }
    return this.defaultRequest(
      processName,
      path,
      method,
      params,
      data,
      jsonHeaders
    );
  }

  /**
   *
   * @param processName
   * @param path
   * @param method
   * @param params
   * @param data not used if method == "GET"
   * @param headers
   */
  public defaultRequest(
    processName: string,
    path: string,
    method: 'GET' | 'POST',
    params?: HttpParams,
    data?: any,
    headers?: HttpHeaders
  ): Promise<any> {
    // clean up optional parameters
    if (headers == undefined) headers = new HttpHeaders();
    if (params == undefined) params = new HttpParams();
    if (data == undefined) data = '';

    const response$ = this._request(path, method, params, data, headers);
    return this._handleResponse(processName, response$);
  }

  private _request(
    path: string,
    method: 'GET' | 'POST',
    params: HttpParams,
    body: any,
    headers: HttpHeaders
  ): Observable<HttpResponse<any>> {
    // observer =
    if (method == 'GET') {
      return this._getRequest(path, params, headers);
    } else {
      // if (method == 'POST') {
      return this._postRequest(path, params, body, headers);
    }
    //  else {
    //   // TODO: raise illegal parameter error
    // }
  }

  private _getRequest(
    path: string,
    params: HttpParams,
    headers: HttpHeaders
  ): Observable<HttpResponse<any>> {
    return <Observable<HttpResponse<any>>>this.http.get<any>(
      // environment.serverURL + path,
      // '/'  path,
      path,
      {
        headers: headers,
        observe: 'response',
        params: params,
      }
    );
  }

  private _postRequest(
    path: string,
    params: HttpParams,
    body: any,
    headers: HttpHeaders
  ): Observable<HttpResponse<any>> {
    return <Observable<HttpResponse<any>>>this.http.post<any>(
      // environment.serverURL + path,
      // '/' + path,
      path,
      body,
      {
        headers: headers,
        observe: 'response',
        params: params,
      }
    );
  }

  private async _handleResponse(
    processName: string,
    response$: Observable<HttpResponse<any>>
  ): Promise<any> {
    let tmp = response$.pipe(
      timeout(20000),
      // timeout
      catchError((e) => {
        return of(e);
      })
    );

    let promise = await new Promise<HttpResponse<any>>((resolve, reject) =>
      tmp.subscribe({
        // TODO: not sure whether adding the _handleNext or _handleError functions lower or increase the complexity
        next: (response) => {
          // this._handleNext(processName, response, resolve, reject);
          if (response.ok) {
            if (!this.silent) {
              this._log(
                processName + ' successful! Server response:',
                response
              );
            }
            resolve(response);
          } else {
            this._log(
              processName + ' not successful! Got Error message:',
              response
            );
            const error = <HttpErrorResponse>(<any>response);
            this._openErrorPopUp(error);
            reject(response);
          }
        },
        error: (error) => {
          // this._handleError(processName, error);
          if (error.name == 'TimeoutError') {
            this._log(processName + ' timed out');
          } else {
            this._log(processName + ' not successful!: Error: ', error);
          }
          this._openErrorPopUp(error);
          reject(error);
        },
      })
    );
    return promise;
  }

  private _log(message: string, obj?: any) {
    if (isDevMode()) {
      if (obj) {
        console.log(message, obj);
      } else {
        console.log(message);
      }
    }
  }

  private _openErrorPopUp(error: HttpErrorResponse) {
    this.dialogRef.open(InformationPopUpComponent, {
      data: {
        header: 'Process failed',
        text: 'Error ' + error.status + ' \n' + error.error,
      },
    });
  }
}
