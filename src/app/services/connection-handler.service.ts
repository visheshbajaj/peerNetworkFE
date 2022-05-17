import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplianceState } from '../models/ApplianceState';

@Injectable({
  providedIn: 'root'
})
export class ConnectionHandlerService {
  private _getUrl = '../../assets/data.json'
  
  constructor(private http: HttpClient) { }

  getData(data: ApplianceState){
    return this.http.get(this._getUrl);
  }

  postData(data: ApplianceState){
    let _url = this.generateRequestUrl(data.ip, data.port, 'POST');
    console.log(data, _url)
    // return this.http.post(_url, data)
  }

  private generateRequestUrl(ipAddress: string, portNumber: number, action: string ): string {
    const apiEndpoint = action == 'GET' ? 'getData' : action == 'POST' ? 'putData' : '';
    return `http://${ipAddress}:${portNumber}/peer/${apiEndpoint}`
  }
}
