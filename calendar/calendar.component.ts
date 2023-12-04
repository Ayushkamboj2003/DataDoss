import { Component } from '@angular/core';
import { GalleryComponent } from '../gallery/gallery.component';

@Component({
  selector: 'app-calendar',
  template: `
    <app-calendar-daily *abpPermission="'HMI.Dashboard.Host'"></app-calendar-daily>
  `,
})
export class CalendarComponent {
  
}
