import { eLayoutType, RoutesService } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const ITEMS_ITEM_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true },
];

function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      {
        path: '/alarms',
        iconClass: 'fas fa-tag',
        name: '::Menu:Alarms',
        layout: eLayoutType.application,
      },
    ]);
  };
}
