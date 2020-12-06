import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISurveyHeader, SurveyHeader } from 'app/shared/model/surveystore/survey-header.model';
import { SurveyHeaderService } from './survey-header.service';
import { SurveyHeaderComponent } from './survey-header.component';
import { SurveyHeaderDetailComponent } from './survey-header-detail.component';
import { SurveyHeaderUpdateComponent } from './survey-header-update.component';

@Injectable({ providedIn: 'root' })
export class SurveyHeaderResolve implements Resolve<ISurveyHeader> {
  constructor(private service: SurveyHeaderService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISurveyHeader> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((surveyHeader: HttpResponse<SurveyHeader>) => {
          if (surveyHeader.body) {
            return of(surveyHeader.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SurveyHeader());
  }
}

export const surveyHeaderRoute: Routes = [
  {
    path: '',
    component: SurveyHeaderComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreSurveyHeader.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SurveyHeaderDetailComponent,
    resolve: {
      surveyHeader: SurveyHeaderResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreSurveyHeader.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SurveyHeaderUpdateComponent,
    resolve: {
      surveyHeader: SurveyHeaderResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreSurveyHeader.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SurveyHeaderUpdateComponent,
    resolve: {
      surveyHeader: SurveyHeaderResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreSurveyHeader.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
