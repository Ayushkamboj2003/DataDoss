import { AuthGuard, PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DsmindTopbarComponent } from './components/dsmind-topbar.component';

const routes: Routes = [
  {
    path: '',
    component: DsmindTopbarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DsmindTopbarRoutingModule {}
