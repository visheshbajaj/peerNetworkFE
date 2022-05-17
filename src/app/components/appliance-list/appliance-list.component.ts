import { Component, OnInit, OnChanges } from '@angular/core';
import { ApplianceState, applianceStateMapper } from 'src/app/models/ApplianceState';
import { ConnectionHandlerService } from '../../services/connection-handler.service'

@Component({
  selector: 'app-appliance-list',
  templateUrl: './appliance-list.component.html',
  styleUrls: ['./appliance-list.component.scss']
})
export class ApplianceListComponent implements OnInit {

  applianceState: ApplianceState = new ApplianceState();
  
  acState: ApplianceState = new ApplianceState('AC', true, 20, '192.168.0.1', 8000);
  bulbState:ApplianceState = new ApplianceState('Bulb', true, 40, '192.168.0.2', 8000);

  defaultState: ApplianceState[] = [this.acState, this.bulbState]
  applianceStateList: ApplianceState[] = []

  constructor(private connectionHandler: ConnectionHandlerService) {}

  ngOnInit(): void {

    this.defaultState.map(appliance => {
      this.connectionHandler.getData(appliance).subscribe(result => {
        this.applianceStateList.push(applianceStateMapper(result))
      })
    })

  }

  updateApplianceState(event: any): void {
    const sourceId = event.source.id;
    const state = event.checked;
    
    const appliance = this.applianceStateList.find(element => element.appliance == sourceId)
    
    if(appliance){
      appliance.state = state 
      this.connectionHandler.postData(appliance)
    }
  }

  updateApplianceValue(event: any): void {
    const sourceId = event.source.id;
    const value = event.value;
    
    const appliance = this.applianceStateList.find(element => element.appliance == sourceId)
    
    if(appliance){
      appliance.value = value 
      this.connectionHandler.postData(appliance)
    }
  }

}
