import { ABP, downloadBlob, ListService, PagedResultDto, TrackByService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { DateAdapter } from '@abp/ng.theme.shared/extensions';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import { MachineAlarms, MachineAlarmService } from '@proxy/machine-alarms';
import { MachineCommonCommandService } from '@proxy/machine-common-commands';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-dsmind-alarms',
  templateUrl: './dsmind-alarms.component.html',
  styleUrls: ['./dsmind-alarms.component.scss']
})

export class DsmindAlarmsComponent implements OnInit {

  data: MachineAlarms;
  dataJson: JSON;
  interval: any;

  constructor(
    public readonly alarmService: MachineAlarmService,
    public readonly machineCommonService: MachineCommonCommandService,
    public sharedService: SharedService,
  ) {

  }

  getAlarms():void {
        
        this.alarmService.getAlarms().subscribe( x => {
          
          let jsonObjString = JSON.stringify(x);
          let jsonObj = JSON.parse(jsonObjString);
          this.dataJson = JSON.parse(jsonObjString);
          this.data = jsonObj as MachineAlarms;
        
        });

  }
  ngOnInit(): void {

    if (this.sharedService.readAlarmsActive == true) {
      this.getAlarms();
      this.refreshData();
      this.interval = setInterval(() => { 
          this.refreshData(); 
      }, 2000);
  
    }

  }


refreshData(){
    this.getAlarms();
}

ResetAllarmi(){

  this.machineCommonService.ResetAlarms().subscribe( x => {
    console.log(x) ;//this.data = x.dsta;
  });
}


}