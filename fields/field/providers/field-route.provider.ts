import { eLayoutType, RoutesService } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const FIELDS_FIELD_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      /*{
        path: '/fields',
        iconClass: 'fas fa-code',
        name: '::Menu:Fields',
        layout: eLayoutType.application,
        requiredPolicy: 'HMI.Fields',
      },*/
    ]);
  };
}
