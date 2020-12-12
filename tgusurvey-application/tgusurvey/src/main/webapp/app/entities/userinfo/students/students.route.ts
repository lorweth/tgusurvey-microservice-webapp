import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IStudents, Students } from 'app/shared/model/userinfo/students.model';
import { StudentsService } from './students.service';
import { StudentsComponent } from './students.component';
import { StudentsDetailComponent } from './students-detail.component';
import { StudentsUpdateComponent } from './students-update.component';

@Injectable({ providedIn: 'root' })
export class StudentsResolve implements Resolve<IStudents> {
  constructor(private service: StudentsService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStudents> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((students: HttpResponse<Students>) => {
          if (students.body) {
            return of(students.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Students());
  }
}

export const studentsRoute: Routes = [
  {
    path: '',
    component: StudentsComponent,
    data: {
      authorities: [Authority.STUDENTS, Authority.ADMIN],
      pageTitle: 'tgusurveyApp.userinfoStudents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: StudentsDetailComponent,
    resolve: {
      students: StudentsResolve,
    },
    data: {
      authorities: [Authority.STUDENTS, Authority.ADMIN],
      pageTitle: 'tgusurveyApp.userinfoStudents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: StudentsUpdateComponent,
    resolve: {
      students: StudentsResolve,
    },
    data: {
      authorities: [Authority.STUDENTS, Authority.ADMIN],
      pageTitle: 'tgusurveyApp.userinfoStudents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: StudentsUpdateComponent,
    resolve: {
      students: StudentsResolve,
    },
    data: {
      authorities: [Authority.STUDENTS, Authority.ADMIN],
      pageTitle: 'tgusurveyApp.userinfoStudents.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
