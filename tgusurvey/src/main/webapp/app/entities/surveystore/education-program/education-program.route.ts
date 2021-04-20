import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEducationProgram, EducationProgram } from 'app/shared/model/surveystore/education-program.model';
import { EducationProgramService } from './education-program.service';
import { EducationProgramComponent } from './education-program.component';
import { EducationProgramDetailComponent } from './education-program-detail.component';
import { EducationProgramUpdateComponent } from './education-program-update.component';

@Injectable({ providedIn: 'root' })
export class EducationProgramResolve implements Resolve<IEducationProgram> {
  constructor(private service: EducationProgramService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEducationProgram> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((educationProgram: HttpResponse<EducationProgram>) => {
          if (educationProgram.body) {
            return of(educationProgram.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EducationProgram());
  }
}

export const educationProgramRoute: Routes = [
  {
    path: '',
    component: EducationProgramComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'tgusurveyApp.surveystoreEducationProgram.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EducationProgramDetailComponent,
    resolve: {
      educationProgram: EducationProgramResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreEducationProgram.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EducationProgramUpdateComponent,
    resolve: {
      educationProgram: EducationProgramResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreEducationProgram.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EducationProgramUpdateComponent,
    resolve: {
      educationProgram: EducationProgramResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreEducationProgram.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
