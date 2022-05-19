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

  putData(data: ApplianceState){
    let _url = this.generateRequestUrl(data, 'PUT');
    return this.http.put(_url, {});
  }

  private generateRequestUrl(applianceState:ApplianceState, action: string ) {
    let sensorType, ip, port;
    switch (applianceState.appliance) {
      case 'AC':
        sensorType = 'temperature'
        ip = '54.204.76.18'
        port = '8085'
        break;
      case 'Light':
        sensorType = 'motion'
        ip = '18.212.204.157'
        port = '8085'
        break;
    }

    if(action == 'PUT'){
      const state = applianceState.state ? 'on' : 'off'
      return `http://${ip}:${port}/peer/putData?sensorType=${sensorType}&value=${applianceState.value}&onOff=${state}&device=mobile`
    } else {
      return `http://${ip}:${port}/peer/getData`
    }

  }
}
