import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApplianceState } from '../models/ApplianceState';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionHandlerService {
  private _getUrl = '../../assets/data.json'
  
  constructor(private http: HttpClient) { }

  getData(data: ApplianceState){
    let _url = this.generateRequestUrl(data, 'GET');
    return this.http.get(_url);
  }

  postData(data: ApplianceState){
    let _url = this.generateRequestUrl(data, 'PUT');
    let x = this.http.put(_url, {}); 
    console.log(x)
    return x
  }

  private generateRequestUrl(applianceState:ApplianceState, action: string ) {
    if(action == 'PUT'){
      const sensorType = applianceState.appliance == 'AC' ? 'temperature' : 'motion'
      const state = applianceState.state ? 'on' : 'off'
      return `http://${applianceState.ip}:${applianceState.port}/peer/putData?sensorType=${sensorType}&value=${applianceState.value}&onOff=${state}&device=mobile`  
    } else {
      return `http://${applianceState.ip}:${applianceState.port}/peer/getData`
    }
    
  }
}
