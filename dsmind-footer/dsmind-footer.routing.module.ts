import { AuthGuard, PermissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DsmindFooterComponent } from './components/dsmind-footer.component';

const routes: Routes = [
  {
    path: '',
    component: DsmindFooterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DsmindFooterRoutingModule {}
