import { AuthGuard, PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DsmindAlarmsComponent } from './components/dsmind-alarms.component';

const routes: Routes = [
  {
    path: '',
    component: DsmindAlarmsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DsmindAlarmsRoutingModule {}
