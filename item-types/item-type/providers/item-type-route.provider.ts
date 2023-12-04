import { eLayoutType, RoutesService } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const ITEM_TYPES_ITEM_TYPE_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      /*{
        path: '/item-types',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:ItemTypes',
        layout: eLayoutType.application,
        requiredPolicy: 'HMI.ItemTypes',
      },*/
    ]);
  };
}
