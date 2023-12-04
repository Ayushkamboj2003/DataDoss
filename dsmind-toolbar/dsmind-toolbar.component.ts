import { ChangeDetectorRef, Component, NgModule } from '@angular/core';
import { MachineCommonCommandService } from '@proxy/machine-common-commands';
import { ReadDataFromMachineService } from '../proxy/read-data-from-machine';
import { MachineAlarmService, MachineAlarms } from '@proxy/machine-alarms';
import { DsmindToolbarModule } from './dsmind-toolbar.module';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-dsmind-toolbar',
  templateUrl: './dsmind-toolbar.component.html',
  styleUrls: ['./dsmind-toolbar.component.scss']
})
export class DsmindToolbarComponent {
 numAlarms: number = 0;
 bAlarms: boolean = false;

 data: MachineAlarms;
 dataJson: JSON;
 interval: any;

 constructor(
  
  public readonly readDataFomMachineService: ReadDataFromMachineService,
  public readonly machineCommonCommandService: MachineCommonCommandService,
  public readonly alarmService: MachineAlarmService,
  private changeDetector: ChangeDetectorRef,
  public sharedService: SharedService,
  ) {}

  getAlarms():void {

    this.alarmService.getAlarms().subscribe( x => {
      let jsonObjString = JSON.stringify(x);
      console.log("Allarmi");
      console.log(x)
      let jsonObj = JSON.parse(jsonObjString);
      this.dataJson = JSON.parse(jsonObjString);
      this.data = jsonObj as MachineAlarms;
      this.numAlarms = this.data.alarm_counter;
      if (this.numAlarms > 0) {
        this.bAlarms = true;
      } else {
        this.bAlarms = false;
      }
      //console.log("Allarmi Attivi - " + this.data.AlarmCounter);
      this.changeDetector.markForCheck();
    });
}

  ngOnInit(): void {
    if (this.sharedService.readAlarmsActive == true) {
      this.getAlarms();
      this.refreshData();
      this.interval = setInterval(() => { 
          this.refreshData(); 
      }, 5000);
    }



  }

  refreshData(){
    this.getAlarms();
  }
}
