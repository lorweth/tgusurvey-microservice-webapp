import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILecturer, Lecturer } from 'app/shared/model/userinfo/lecturer.model';
import { LecturerService } from 'app/entities/userinfo/lecturer/lecturer.service';
import { LecturerProfileComponent } from './lecturer-profile.component';

@Injectable({ providedIn: 'root' })
export class LectureProfileResolve implements Resolve<ILecturer> {
  constructor(private service: LecturerService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILecturer> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((students: HttpResponse<ILecturer>) => {
          if (students.body) {
            return of(students.body);
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

export const lecturerProfileRoute: Routes = [
  {
    path: '',
    component: LecturerProfileComponent,
    data: {
      authorities: [Authority.LECTURERS],
      pageTitle: 'tgusurveyApp.userinfoLecturer.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
