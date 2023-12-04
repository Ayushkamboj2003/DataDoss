import { Component } from '@angular/core';
import { MachineCommonCommandService } from '@proxy/machine-common-commands';
import { ReadDataFromMachineService } from '@proxy/read-data-from-machine';
import { SharedService } from 'src/app/shared/shared.service';


@Component({
  selector: 'app-dsmind-topbar',
  templateUrl: './dsmind-topbar.component.html',
  styleUrls: ['./dsmind-topbar.component.scss']
})
export class DsmindTopbarComponent {

  constructor(
    
    public readonly readDataFomMachineService: ReadDataFromMachineService,
    public readonly machineCommonCommandService: MachineCommonCommandService,
    public sharedService: SharedService,
    ) {}


  isMachineRunning: boolean = false;
  sMachineStatusDescription: string= "";
  nMachineInspectionMode: number = 0;
  interval:any;
  
  refresh() {
    this.readDataFomMachineService.getPLCParams().subscribe(x => {
      console.log("Machine Settings Top Bar");
      console.log(x);
      if (x.MachineStatus.base == "Inspection") {
        this.isMachineRunning = true;
      } else {
        this.isMachineRunning = false;
      }
      this.sMachineStatusDescription = x.MachineStatus.description;
      
    }
  )};

  ngOnInit(){
    if (this.sharedService.refreshDataActive == true) {
      this.refresh();
      this.interval = setInterval(() => { 
        this.refresh(); 
    }, 500);
    }
  }

  ngAfterViewChecked() {
      var attivatoggle:string;
      attivatoggle = "document.querySelectorAll('input[type=checkbox][data-toggle=\"toggle\"]').forEach(function(ele) {ele.bootstrapToggle();});";
      //attivatoggle = "alert('123')";
      eval(attivatoggle);
  }
    
  onStartStop(values:any):void {
    if (values.currentTarget.checked) {
      console.log("Start");
      console.log("Eseguito IF True");
      if (!this.isMachineRunning) {

        //Invio i parametri della ricetta
        this.startMachine();
        this.isMachineRunning = true;
      }

    } else
    {
      console.log("Stop");
      console.log("Eseguito IF False");
      if (this.isMachineRunning) {
        this.stopMachine();
        this.isMachineRunning= false;
      }
      
    }
  }

  startMachine():void {

    if (this.nMachineInspectionMode == 0) {
      this.machineCommonCommandService.StartMachine().subscribe(x => {
        console.log(x);
      });
    } else if (this.nMachineInspectionMode == 1) {
      this.machineCommonCommandService.StartCalibration().subscribe(x => {
        console.log(x);
      });
    }

    
  }

  stopMachine():void {
    this.machineCommonCommandService.StopMachine().subscribe(x => {
        console.log(x);
      });
  }
}
