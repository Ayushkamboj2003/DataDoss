import { Component, Injector } from '@angular/core';
import { MachineAlarmService, MachineAlarms } from '@proxy/machine-alarms';
import { MachineCommonCommandService } from '@proxy/machine-common-commands';
import { ReadDataFromMachineService } from '@proxy/read-data-from-machine';
import { SharedService } from 'src/app/shared/shared.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from '@abp/ng.theme.shared';
import { handleHttpErrors } from 'src/app/error404/error-handler';


@Component({
  selector: 'app-dsmind-footer',
  templateUrl: './dsmind-footer.component.html',
  styleUrls: ['./dsmind-footer.component.scss']
})
export class DsmindFooterComponent {
  injector: Injector;

  constructor(
    
    public readonly readDataFomMachineService: ReadDataFromMachineService,
    public readonly machineCommonCommandService: MachineCommonCommandService,
    public readonly alarmService: MachineAlarmService,
    public sharedService: SharedService,
    private http: HttpClient, private toaster: ToasterService
    ) {}

    isMachineRunning: boolean = false;
    isAlarmactive: boolean = false;

    alarms: MachineAlarms;
    dataJson: JSON;

    nMachineStatus: number = 0;
    sMachineStatusDescription: string= "";
    interval:any;
    
    refresh() {
      
      this.readDataFomMachineService.getPLCParams().subscribe(x => {
        console.log("Machine Status:");
        console.log(x.MachineStatus)
        //this.nMachineStatus = x.MachineStatus.
        if (x.MachineStatus.Base == 2) {
          this.isMachineRunning = true;
        } else if (x.MachineStatus.Base == 1) {
          this.isMachineRunning = false;
        }
        this.sMachineStatusDescription = x.MachineStatus.description;
      })

      this.alarmService.getAlarms().subscribe( x => {
          
        let jsonObjString = JSON.stringify(x);
        let jsonObj = JSON.parse(jsonObjString);
        this.dataJson = JSON.parse(jsonObjString);
        this.alarms = jsonObj as MachineAlarms;

        if (this.alarms.alarm_counter > 0) {
          this.isAlarmactive  = true
        } else {
          this.isAlarmactive  = false
        }

      });

    };
  
    ngOnInit(){
      if (this.sharedService.refreshDataActive == true) {
        this.refresh();
        this.interval = setInterval(() => { 
          this.refresh(); 
      }, 2000);
  
      }
  
    }
    makeHttpRequest() {
      this.http.get('/api/some-endpoint').subscribe(
        (response) => {
          // Handle the successful response
        },
        (error: HttpErrorResponse) => {
          // Handle the error
          handleHttpErrors(this.injector, error); // Use your error handling function
          // Set error-related properties for display in HTML
        }
      );
    }
    
}
