import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { SurveyDetailComponent } from './survey-detail.component';
import { ISurveyFormDTO, SurveyFormDTO } from 'app/shared/model/surveystore/survey-form-dto.model';
import { SurveyFormService } from 'app/entities/surveystore/survey-form/survey-form.service';
import { SurveyManagerComponent } from './survey-manager.component';

@Injectable({ providedIn: 'root' })
export class SurveyManagerResolve implements Resolve<ISurveyFormDTO> {
  constructor(private service: SurveyFormService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISurveyFormDTO> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.getFullSurvey(id).pipe(
        flatMap((forms: HttpResponse<SurveyFormDTO>) => {
          if (forms.body) {
            return of(forms.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SurveyFormDTO());
  }
}

export const surveyFormManagerRoute: Routes = [
  {
    path: '',
    component: SurveyManagerComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'tgusurveyApp.surveystoreSurveyForm.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SurveyDetailComponent,
    resolve: {
      surveyForm: SurveyManagerResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreSurveyForm.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
