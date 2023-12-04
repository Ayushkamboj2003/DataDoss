import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-host-dashboard *abpPermission="'HMI.Dashboard.Host'"></app-host-dashboard>
    <app-tenant-dashboard *abpPermission="'HMI.Dashboard.Tenant'"></app-tenant-dashboard>
  `,
})
export class DashboardComponent {
  
}
