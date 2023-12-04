import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import {
  AverageExecutionDurationWidgetComponent,
  ErrorRateWidgetComponent,
} from '@volo/abp.ng.audit-logging';
import { EditionsUsageWidgetComponent, LatestTenantsWidgetComponent } from '@volo/abp.ng.saas';
import { UntypedFormBuilder } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ReadDataFromMachineService } from '@proxy/read-data-from-machine';
import { MachineCommonCommandService } from '@proxy/machine-common-commands';
import { ABP } from '@abp/ng.core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexFill,
  ChartComponent,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};


const now = new Date();
const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

@Component({
  selector: 'app-host-dashboard',
  templateUrl: './host-dashboard.component.html',
  styleUrls: ['./host-dashboard.component.scss'],
})
export class HostDashboardComponent implements AfterViewInit {
  @ViewChild('errorRateWidget', { static: false })
  errorRateWidget: ErrorRateWidgetComponent;

  @ViewChild('averageExecutionDurationWidget', { static: false })
  averageExecutionDurationWidget: AverageExecutionDurationWidgetComponent;

  @ViewChild('editionsUsageWidget', { static: false })
  editionsUsageWidget: EditionsUsageWidgetComponent;

  @ViewChild('latestTenantsWidget', { static: false })
  latestTenantsWidget: LatestTenantsWidgetComponent;

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public voltChartOptions: Partial<ChartOptions>;
  public VAChartOptions: Partial<ChartOptions>;
  public wattChartOptions: Partial<ChartOptions>;

  
  goodcolor: string = '#08af08';
  scrapcolor: string = '#FF0000';
  overfeedcolor: string  ='#DAA520';
  interval:any;

  currentVolt: number = 381.2;
  currentVA:number = 405.6;
  currentWatt:number= 275;


  /*voltmeterData: number[] = [0]; // Valore iniziale del voltmetro
  chartOptions: ApexOptions = {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        dataLabels: {
          name: {
            offsetY: 10,
            show: true,
            color: '#888',
            fontSize: '13px'
          },
          value: {
            color: '#111',
            fontSize: '30px',
            show: true,
          }
        }
      },
    },
    labels: ['Voltmetro'],
  };*/

  totalCounter = {
    labels: ['Data 1', 'Data 2', 'Data 3'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [40, 15, 45],
        backgroundColor: [this.goodcolor, this.scrapcolor, this.overfeedcolor],
      },
    ],
  };



  Station0Counter = {
    labels: ['Good', 'Overfeed', 'Scrap'],
      datasets: [
        {
          label: 'Dimensionale',
          data: [0, 0, 0],
          backgroundColor: [this.goodcolor,this.overfeedcolor, this.scrapcolor],
        },
      ],
    };
  

  Station1Counter = {
  labels: ['Good', 'Overfeed', 'Scrap'],
    datasets: [
      {
        label: 'Superficiale A',
        data: [0, 0, 0],
        backgroundColor: [this.goodcolor,this.overfeedcolor, this.scrapcolor],
      },
    ],
  };

  Station2Counter = {
    labels: ['Good', 'Overfeed', 'Scrap'],
      datasets: [
        {
          label: 'Superficiale B',
          data: [0, 0, 0],
          backgroundColor: [this.goodcolor,this.overfeedcolor, this.scrapcolor],
        },
      ],
    };

  Station3Counter = {
    labels: ['Good', 'Overfeed', 'Scrap'],
      datasets: [
        {
          label: 'Superficiale C',
          data: [0, 0, 0],
          backgroundColor: [this.goodcolor,this.overfeedcolor, this.scrapcolor],
        },
      ],
    };

  Station4Counter = {
    labels: ['Good', 'Overfeed', 'Scrap'],
      datasets: [
        {
          label: 'Superficiale D',
          data: [0, 0, 0],
          backgroundColor: [this.goodcolor,this.overfeedcolor, this.scrapcolor],
        },
      ],
    };

  Station5Counter = {
    labels: ['Good', 'Overfeed', 'Scrap'],
      datasets: [
        {
          label: 'Superficiale E',
          data: [0, 0, 0],
          backgroundColor: [this.goodcolor,this.overfeedcolor, this.scrapcolor],
        },
      ],
    };



  totalCounterOptions = {
    animation: false,
    plugins: {
      title: {
        display: true,
        text: 'Total Counter',
        fontSize: 16,
      },
      legend: {
        position: 'bottom',
      },
    },
  };


  Station0Options = {
    animation: false,
    plugins: {
      title: {
        //display: true,
        //text: 'Dimensionale',
        //fontSize: 24,
      },
      legend: {
        position: 'bottom',
        
        labels: {
          //fontSize: 8,
          usePointStyle: true,
          boxWidth: 8,
          color: 'white', 
          textAlign: 'center',
          padding:15,
          font: {
            //family: 'Arial', // Imposta il tipo di font desiderato
            size:'18px',
          }
        }
      },
    },
  };

  Station1Options = {
    animation: false,
    plugins: {
      title: {
        //display: true,
        //text: 'Superficiale A',
        //fontSize: 36,
      },
      legend: {
        position: 'bottom',
        
        labels: {
          //fontSize: 8,
          usePointStyle: true,
          boxWidth: 10,
          color: 'white', 
          textAlign: 'center',
          padding:15,
          font: {
            //family: 'Arial', // Imposta il tipo di font desiderato
            size:'18px',
          }
        }
      },
    },
  };

  Station2Options = {
    animation: false,
    plugins: {
      title: {
        //display: true,
        //text: 'Superficiale B',
        //fontSize: 16,
        
      },
      legend: {
        position: 'bottom',
        
        labels: {
          //fontSize: 8,
          usePointStyle: true,
          boxWidth: 8,
          color: 'white', 
          textAlign: 'center',
          padding:15,
          font: {
            //family: 'Arial', // Imposta il tipo di font desiderato
            size:'18px',
          }
        }
      },
    },
  };

  Station3Options = {
    animation: false,
    plugins: {
      title: {
        //display: true,
        //text: 'Superficiale C',
        //fontSize: 16,
      },
      legend: {
        position: 'bottom',
        
        labels: {
          //fontSize: 8,
          usePointStyle: true,
          boxWidth: 8,
          color: 'white', 
          textAlign: 'center',
          padding:15,
          font: {
            //family: 'Arial', // Imposta il tipo di font desiderato
            size:'18px',
          }
        }
      },
    },
  };

  Station4Options = {
    animation: false,
    plugins: {
      title: {
        //display: true,
        //text: 'Superficiale D',
        //fontSize: 16,
      },
      legend: {
        position: 'bottom',
        
        labels: {
          //fontSize: 8,
          usePointStyle: true,
          boxWidth: 8,
          color: 'white', 
          textAlign: 'center',
          padding:15,
          font: {
            //family: 'Arial', // Imposta il tipo di font desiderato
            size:'18px',
          }
        }
      },
    },
  };

  Station5Options = {
    animation: false,
    plugins: {
      title: {
        //display: true,
        //text: 'Superficiale E',
        //fontSize: 16,
      },
      legend: {
        position: 'bottom',
        
        labels: {
          //fontSize: 8,
          usePointStyle: true,
          boxWidth: 8,
          color: 'white', 
          textAlign: 'center',
          padding:15,
          font: {
            //family: 'Arial', // Imposta il tipo di font desiderato
            size:'18px',
          }
        }
      },
    },
  };


  boxCounterOptions= {
    animation: false,
  };

  productionInfoOptions= {
    animation: false,
  };

  productionInfoPerSecondOptions= {
    animation: false,
  };  

  productionInfo = {
    
    labels: ['Good Partial', 'Good Total'],
    datasets: [
      {
        label: 'Production Info',
        data: [0, 0],
        backgroundColor: ['#ff7675', '#fdcb6e'],
      },
    ],
  };

  productionInfoPerSecond = {
    labels: ['Parts per Second', 'Parts per Second Alim'],
    datasets: [
      {
        label: 'Speed Data',
        data: [0, 0],
        backgroundColor: ['#ff7675', '#fdcb6e'],
      },
    ],
  };

  boxCounter = {
    labels: ['Box 1','Box 2'],
    datasets: [
      {
        label: '',
        data: [10,20],
        borderColor: 'Green',
      }
    ],
  };

  

  toDate = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
  } as NgbDateStruct;

  fromDate = {
    year: oneMonthAgo.getFullYear(),
    month: oneMonthAgo.getMonth() + 1,
    day: oneMonthAgo.getDate(),
  } as NgbDateStruct;

  formFilters = this.fb.group({
    times: [
      {
        fromDate: this.fromDate,
        toDate: this.toDate,
      },
    ],
  });

  constructor(
      private cdr: ChangeDetectorRef,
      private fb: UntypedFormBuilder,
      public readonly readDataFomMachineService: ReadDataFromMachineService,
      public readonly machineCommonCommandService: MachineCommonCommandService,
      private router: Router,
      public sharedService: SharedService,
     

      ) {}

  ngOnInit() {
    this.interval = setInterval(() => { 
      this.refresh(); 
  }, 5000);


  this.voltChartOptions = {
    series: [this.currentVolt / 800 * 100],
    chart: {
      height: 220,
      type: "radialBar",
      offsetY: -10
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "16px",
            color: undefined,
            offsetY: 120
          },
          value: {
            offsetY: 76,
            fontSize: "22px",
            color: '#fff',
            formatter: function(val) {
              return Math.round((val / 100) * 800) + " V";
            }
          }
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91]
      }
    },
    stroke: {
      dashArray: 4
    },
    labels: ["Volt"]
  };


  this.VAChartOptions = {
    series: [this.currentVA / 1000 * 100],
    chart: {
      height: 220,
      type: "radialBar",
      offsetY: -10
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "16px",
            color: undefined,
            offsetY: 120
          },
          value: {
            offsetY: 76,
            fontSize: "22px",
            color: '#fff',
            formatter: function(val) {
              return Math.round((val / 100) * 1000) + " VA";
            }
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91]
      }
    },
    stroke: {
      dashArray: 4
    },
    labels: ["VA"]
  };


  this.wattChartOptions = {
    series: [this.currentWatt / 3000 * 100],
    chart: {
      height: 220,
      type: "radialBar",
      offsetY: -10
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: "16px",
            color: undefined,
            offsetY: 120
          },
          value: {
            offsetY: 76,
            fontSize: "22px",
            color: '#fff',
            formatter: function(val) {
              return Math.round((val / 100) * 3000) + " w";
            }
          }
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91]
      }
    },
    stroke: {
      dashArray: 4
    },
    labels: ["Watt"]
  };




  }
  
  ngAfterViewInit() {
    this.refresh();
  }


  navigateToDestinationView(id:number) {
    const navigationExtras = {
      queryParams: {stationId: id}
    };
    this.router.navigate(['recipes/'+this.sharedService.currentRecipeId], navigationExtras);
  }


  onStartStop(values:any):void {
    if (values.currentTarget.checked) {
     
      console.log("Start");
      console.log("Eseguito IF True");
      this.startMachine();
    } else
    {
      console.log("Stop");
      console.log("Eseguito IF False");
      this.stopMachine();
    }
  }

  startMachine():void {
    this.machineCommonCommandService.StartMachine().subscribe(x => {
        console.log(x);
      });
  }

  stopMachine():void {
    this.machineCommonCommandService.StopMachine().subscribe(x => {
        console.log(x);
      });
  }
  
  refresh() {

    if (this.sharedService.refreshDataActive != true) {

      return;

    }
    
    /*this.readDataFomMachineService.getPowerData().subscribe(x=> {
        console.log("Power Data");
        console.log(x);
        if (x.PotenzaApparente != 'NaN') {
          this.currentVA = x.PotenzaApparente;
          this.VAChartOptions.series = [this.currentVA / 1000 * 100];
        }
        if (x.Volt != 'NaN') {
          this.currentVolt = x.Volt;
          this.voltChartOptions.series = [this.currentVolt / 800 * 100]
        }
        if (x.Watt != 'NaN') {
          this.currentWatt = x.Watt;
          this.wattChartOptions.series = [this.currentWatt / 3000 * 100];
        }
        
    })



    this.readDataFomMachineService.getPowerData().subscribe(x=> {
        console.log("Power Data");
        console.log(x);
        //this.voltmeterData = [120];
    })*/

    this.readDataFomMachineService.getPLCParams().subscribe(x => {

      this.Station0Counter = {
        labels: [" " + x.StationCounters[0].good, " " + x.StationCounters[0].scrap, " " + x.StationCounters[0].overfeed],
        datasets: [
          {
            label: 'Dimensionale',
            data: [x.StationCounters[0].good +1 , x.StationCounters[0].scrap, x.StationCounters[0].overfeed],
            backgroundColor: [this.goodcolor, this.scrapcolor, this.overfeedcolor],
          },
        ],
      }

      this.Station1Counter = {
        labels: [" " + x.StationCounters[1].good," " +  x.StationCounters[1].scrap, " " + x.StationCounters[1].overfeed],

        datasets: [
          {
            label: 'Superficiale A',
            data: [x.StationCounters[1].good +1, x.StationCounters[1].scrap, x.StationCounters[1].overfeed],
            backgroundColor: [this.goodcolor, this.scrapcolor, this.overfeedcolor],
          },
        ],
      }
      this.Station2Counter = {
        labels: [" " + x.StationCounters[2].good, " " + x.StationCounters[2].scrap, " " +  x.StationCounters[2].overfeed],
        datasets: [
          {
            label: 'Superficiale B',
            data: [x.StationCounters[2].good+1, x.StationCounters[2].scrap, x.StationCounters[2].overfeed],
            backgroundColor: [this.goodcolor, this.scrapcolor, this.overfeedcolor],
          },
        ],
      }

      this.Station3Counter = {
        labels: [" " + x.StationCounters[3].good, " " + x.StationCounters[3].scrap," " +  x.StationCounters[3].overfeed],
        datasets: [
          {
            label: 'Superficiale C',
            data: [x.StationCounters[3].good +1, x.StationCounters[3].scrap, x.StationCounters[3].overfeed],
            backgroundColor: [this.goodcolor, this.scrapcolor, this.overfeedcolor],
          },
        ],
      }

      this.Station4Counter = {
        labels: [" " + x.StationCounters[4].good, " " + x.StationCounters[4].scrap," " +  x.StationCounters[4].overfeed],
        datasets:[
          {
            label: 'Superficiale D',
            data: [x.StationCounters[4].good +1 , x.StationCounters[4].scrap, x.StationCounters[4].overfeed],
            backgroundColor: [this.goodcolor, this.scrapcolor, this.overfeedcolor],
          },
        ],
      }

      this.Station5Counter = {
        labels: [" " + x.StationCounters[4].good," " +  x.StationCounters[4].scrap," " +  x.StationCounters[4].overfeed],
        datasets: [
          {
            label: 'Superficiale E',
            data: [x.StationCounters[4].good +1, x.StationCounters[4].scrap, x.StationCounters[4].overfeed],
            backgroundColor: [this.goodcolor, this.scrapcolor, this.overfeedcolor],
          },
        ],
      }

      this.totalCounter = {
        labels: ['Good: ' + x.TotalCounters.good, 'Scrap:' + x.TotalCounters.scrap, 'Overfeed: '+x.TotalCounters.overfeed],
        datasets: [
          {
            label: 'TotalCounters',
            data: [x.TotalCounters.good, x.TotalCounters.scrap, x.TotalCounters.overfeed],
            backgroundColor: [this.goodcolor, this.scrapcolor, this.overfeedcolor],
          },
        ],
      };

      this.productionInfo = {
        labels: ['Good Partial: ' + x.ProductionInfo.GoodPartial, 'Good Total:' +x.ProductionInfo.GoodTotal],
        datasets: [
          {
            label: 'Production Info',
            data: [x.ProductionInfo.GoodPartial, x.ProductionInfo.GoodTotal],
            backgroundColor: ['#ff7675', this.goodcolor],
          },
        ],
      };

      this.productionInfoPerSecond = {
        labels: ['Parts per Second', 'Parts per Second Alim'],
        
        datasets: [
          {
            
            label: 'Speed Data',
            data: [x.ProductionInfo.PartsPerSecond, x.ProductionInfo.PartsPerSecondAlim],
            backgroundColor: ['#ff7675', '#fdcb6e'],
          },
        ],
      };

      
      this.boxCounter = {
        labels: ['Box 1','Box 2'],
        datasets: [
          {
            label: '',
            data: [x.GoodBoxCounters[0].partsInBox,x.GoodBoxCounters[1].partsInBox],
            borderColor: 'Green',
          }
        ],
      };
    
      /*this.recipeData = xf;
      this.fillRecipeValues(xf);
      this.fieldsData.items.forEach(x => {          
        const recipeFieldFormGroup = this.createRecipeFieldFormGroup(x.field);
        this.recipeAllFields.push(recipeFieldFormGroup);
      });
      console.log(this.recipeForm);*/
    });
    
    this.cdr.markForCheck();
    console.log("update contatori fatto");

    const value = {
      ...this.formFilters.value.times,
    };

    const startDate = new Date(
      value.fromDate.year,
      value.fromDate.month - 1,
      value.fromDate.day
    ).toLocalISOString();
    const endDate = new Date(
      value.toDate.year,
      value.toDate.month - 1,
      value.toDate.day
    ).toLocalISOString();

    this.errorRateWidget?.draw({ startDate, endDate });
    this.averageExecutionDurationWidget?.draw({ startDate, endDate });
    this.editionsUsageWidget?.draw();
    this.latestTenantsWidget?.draw();
  }
  }



