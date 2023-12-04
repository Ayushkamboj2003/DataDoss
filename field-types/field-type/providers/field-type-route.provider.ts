import { eLayoutType, RoutesService } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const FIELD_TYPES_FIELD_TYPE_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      /*{
        path: '/field-types',
        iconClass: 'fas fa-html5',
        name: '::Menu:FieldTypes',
        layout: eLayoutType.application,
        requiredPolicy: 'HMI.FieldTypes',
      },*/
    ]);
  };
}
