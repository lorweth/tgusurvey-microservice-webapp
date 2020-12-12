import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILecturer, Lecturer } from 'app/shared/model/userinfo/lecturer.model';
import { LecturerService } from './lecturer.service';
import { LecturerComponent } from './lecturer.component';
import { LecturerDetailComponent } from './lecturer-detail.component';
import { LecturerUpdateComponent } from './lecturer-update.component';

@Injectable({ providedIn: 'root' })
export class LecturerResolve implements Resolve<ILecturer> {
  constructor(private service: LecturerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILecturer> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((lecturer: HttpResponse<Lecturer>) => {
          if (lecturer.body) {
            return of(lecturer.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Lecturer());
  }
}

export const lecturerRoute: Routes = [
  {
    path: '',
    component: LecturerComponent,
    data: {
      authorities: [Authority.LECTURERS, Authority.ADMIN],
      pageTitle: 'tgusurveyApp.userinfoLecturer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LecturerDetailComponent,
    resolve: {
      lecturer: LecturerResolve,
    },
    data: {
      authorities: [Authority.LECTURERS, Authority.ADMIN],
      pageTitle: 'tgusurveyApp.userinfoLecturer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LecturerUpdateComponent,
    resolve: {
      lecturer: LecturerResolve,
    },
    data: {
      authorities: [Authority.LECTURERS, Authority.ADMIN],
      pageTitle: 'tgusurveyApp.userinfoLecturer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LecturerUpdateComponent,
    resolve: {
      lecturer: LecturerResolve,
    },
    data: {
      authorities: [Authority.LECTURERS, Authority.ADMIN],
      pageTitle: 'tgusurveyApp.userinfoLecturer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
