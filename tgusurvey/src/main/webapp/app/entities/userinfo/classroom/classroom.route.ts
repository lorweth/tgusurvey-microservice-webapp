import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IClassroom, Classroom } from 'app/shared/model/userinfo/classroom.model';
import { ClassroomService } from './classroom.service';
import { ClassroomComponent } from './classroom.component';
import { ClassroomDetailComponent } from './classroom-detail.component';
import { ClassroomUpdateComponent } from './classroom-update.component';

@Injectable({ providedIn: 'root' })
export class ClassroomResolve implements Resolve<IClassroom> {
  constructor(private service: ClassroomService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IClassroom> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((classroom: HttpResponse<Classroom>) => {
          if (classroom.body) {
            return of(classroom.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Classroom());
  }
}

export const classroomRoute: Routes = [
  {
    path: '',
    component: ClassroomComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'tgusurveyApp.userinfoClassroom.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ClassroomDetailComponent,
    resolve: {
      classroom: ClassroomResolve,
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'tgusurveyApp.userinfoClassroom.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ClassroomUpdateComponent,
    resolve: {
      classroom: ClassroomResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.userinfoClassroom.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ClassroomUpdateComponent,
    resolve: {
      classroom: ClassroomResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.userinfoClassroom.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
