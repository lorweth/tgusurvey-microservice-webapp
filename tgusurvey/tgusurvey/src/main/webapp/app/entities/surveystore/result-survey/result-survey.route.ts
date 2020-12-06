import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IResultSurvey, ResultSurvey } from 'app/shared/model/surveystore/result-survey.model';
import { ResultSurveyService } from './result-survey.service';
import { ResultSurveyComponent } from './result-survey.component';
import { ResultSurveyDetailComponent } from './result-survey-detail.component';
import { ResultSurveyUpdateComponent } from './result-survey-update.component';

@Injectable({ providedIn: 'root' })
export class ResultSurveyResolve implements Resolve<IResultSurvey> {
  constructor(private service: ResultSurveyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IResultSurvey> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((resultSurvey: HttpResponse<ResultSurvey>) => {
          if (resultSurvey.body) {
            return of(resultSurvey.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ResultSurvey());
  }
}

export const resultSurveyRoute: Routes = [
  {
    path: '',
    component: ResultSurveyComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreResultSurvey.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ResultSurveyDetailComponent,
    resolve: {
      resultSurvey: ResultSurveyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreResultSurvey.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ResultSurveyUpdateComponent,
    resolve: {
      resultSurvey: ResultSurveyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreResultSurvey.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ResultSurveyUpdateComponent,
    resolve: {
      resultSurvey: ResultSurveyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreResultSurvey.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
