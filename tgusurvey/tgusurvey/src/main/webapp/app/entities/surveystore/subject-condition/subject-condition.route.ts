import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISubjectCondition, SubjectCondition } from 'app/shared/model/surveystore/subject-condition.model';
import { SubjectConditionService } from './subject-condition.service';
import { SubjectConditionComponent } from './subject-condition.component';
import { SubjectConditionDetailComponent } from './subject-condition-detail.component';
import { SubjectConditionUpdateComponent } from './subject-condition-update.component';

@Injectable({ providedIn: 'root' })
export class SubjectConditionResolve implements Resolve<ISubjectCondition> {
  constructor(private service: SubjectConditionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISubjectCondition> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((subjectCondition: HttpResponse<SubjectCondition>) => {
          if (subjectCondition.body) {
            return of(subjectCondition.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SubjectCondition());
  }
}

export const subjectConditionRoute: Routes = [
  {
    path: '',
    component: SubjectConditionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreSubjectCondition.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SubjectConditionDetailComponent,
    resolve: {
      subjectCondition: SubjectConditionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreSubjectCondition.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SubjectConditionUpdateComponent,
    resolve: {
      subjectCondition: SubjectConditionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreSubjectCondition.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SubjectConditionUpdateComponent,
    resolve: {
      subjectCondition: SubjectConditionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreSubjectCondition.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
