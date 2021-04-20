import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISurveyForm, SurveyForm } from 'app/shared/model/surveystore/survey-form.model';
import { SurveyFormService } from './survey-form.service';
import { SurveyFormComponent } from './survey-form.component';
import { SurveyFormDetailComponent } from './survey-form-detail.component';
import { SurveyFormUpdateComponent } from './survey-form-update.component';

@Injectable({ providedIn: 'root' })
export class SurveyFormResolve implements Resolve<ISurveyForm> {
  constructor(private service: SurveyFormService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISurveyForm> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((surveyForm: HttpResponse<SurveyForm>) => {
          if (surveyForm.body) {
            return of(surveyForm.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SurveyForm());
  }
}

export const surveyFormRoute: Routes = [
  {
    path: '',
    component: SurveyFormComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'tgusurveyApp.surveystoreSurveyForm.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SurveyFormDetailComponent,
    resolve: {
      surveyForm: SurveyFormResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreSurveyForm.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SurveyFormUpdateComponent,
    resolve: {
      surveyForm: SurveyFormResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreSurveyForm.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SurveyFormUpdateComponent,
    resolve: {
      surveyForm: SurveyFormResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreSurveyForm.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
