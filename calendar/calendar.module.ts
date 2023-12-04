import { NgModule } from '@angular/core';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AuditLoggingModule } from '@volo/abp.ng.audit-logging';
import { PageModule } from '@abp/ng.components/page';
import { SaasModule } from '@volo/abp.ng.saas';
import { SharedModule } from '../shared/shared.module';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { CalendarDailyComponent } from './calendar/calendar-daily.component';
import { DateRangePickerModule } from '@volo/abp.commercial.ng.ui';
import { ChartModule } from '@abp/ng.components/chart.js';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GalleryComponent } from '../gallery/gallery.component';

@NgModule({
  declarations: [CalendarComponent, CalendarDailyComponent, GalleryComponent],
  imports: [
    ChartModule,
    SharedModule,
    CalendarRoutingModule,
    NgbDatepickerModule,
    AuditLoggingModule,
    SaasModule,
    PageModule,
    DateRangePickerModule,
    FullCalendarModule,
    NgbModule,
  ],
})
export class CalendarModule {}
