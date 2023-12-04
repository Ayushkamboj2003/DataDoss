import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import {
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { CommercialUiModule } from '@volo/abp.commercial.ng.ui';
import { PageModule } from '@abp/ng.components/page';
import { DsmindTopbarComponent } from './components/dsmind-topbar.component';
import { DsmindTopbarRoutingModule } from './dsmind-topbar.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DsmindTopbarComponent],
  imports: [
    DsmindTopbarRoutingModule,
    CoreModule,
    ThemeSharedModule,
    CommercialUiModule,
    NgxValidateCoreModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    PageModule,
    SharedModule,
  ],
})
export class DsmindTopbarModule {}
