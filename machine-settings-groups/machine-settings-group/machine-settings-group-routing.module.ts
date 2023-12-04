import { AuthGuard, PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MachineSettingsGroupComponent } from './components/machine-settings-group.component';

const routes: Routes = [
  {
    path: '',
    component: MachineSettingsGroupComponent,
    canActivate: [AuthGuard, PermissionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MachineSettingsGroupRoutingModule {}
