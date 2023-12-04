import { ContentProjectionService, PROJECTION_STRATEGY } from '@abp/ng.core';
import { ToasterService } from '@abp/ng.theme.shared';
import { HttpErrorResponse } from '@angular/common/http';
import { Injector } from '@angular/core';
import { throwError } from 'rxjs';
import { Error404Component } from './error404.component';

export function handleHttpErrors(injector: Injector, httpError: HttpErrorResponse) {
  if (httpError.status === 400) {
      //  const toaster = injector.get(ToasterService);
      // toaster.error(httpError.error?.error?.message || 'Bad request!', '400');
    const contentProjection = injector.get(ContentProjectionService);
    contentProjection.projectContent(PROJECTION_STRATEGY.AppendComponentToBody(Error404Component));
    return;
  }

  if (httpError.status === 404) {
    const contentProjection = injector.get(ContentProjectionService);
    contentProjection.projectContent(PROJECTION_STRATEGY.AppendComponentToBody(Error404Component));
    return;
  }

  return throwError(httpError);
  

  }

