import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApplianceState } from '../models/ApplianceState';
import { Observable } from 'rxjs';

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
    let _url = this.generateRequestUrl(data, 'POST');
    console.log(_url)
    return this.http.put(_url, {})
  }

  private generateRequestUrl(applianceState:ApplianceState, action: string ) {
    if(action == 'POST'){
      const sensorType = applianceState.appliance == 'AC' ? 'temperature' : 'motion'
      const state = applianceState.state ? 'on' : 'off'
      return `http://${applianceState.ip}:${applianceState.port}/peer/putData?sensorType=${sensorType}&value=${applianceState.value}&onOff=${state}`  
    } else {
      return `http://${applianceState.ip}:${applianceState.port}/peer/getData`
    }
    
  }
}
