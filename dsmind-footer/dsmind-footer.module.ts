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
import { DsmindFooterComponent } from './components/dsmind-footer.component';
import { DsmindFooterRoutingModule } from './dsmind-footer.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [DsmindFooterComponent],
  imports: [
    DsmindFooterRoutingModule,
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
export class DsmindFooterModule {}
