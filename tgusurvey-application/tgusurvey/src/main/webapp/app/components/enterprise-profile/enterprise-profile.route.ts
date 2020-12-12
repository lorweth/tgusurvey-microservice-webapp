import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEnterprise, Enterprise } from 'app/shared/model/userinfo/enterprise.model';

import { EnterpriseService } from 'app/entities/userinfo/enterprise/enterprise.service';
import { EnterpriseProfileComponent } from './enterprise-profile.component';

@Injectable({ providedIn: 'root' })
export class EnterpriseProfileResolve implements Resolve<IEnterprise> {
  constructor(private service: EnterpriseService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEnterprise> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((students: HttpResponse<Enterprise>) => {
          if (students.body) {
            return of(students.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Enterprise());
  }
}

export const enterpriseProfileRoute: Routes = [
  {
    path: '',
    component: EnterpriseProfileComponent,
    data: {
      authorities: [Authority.ENTERPRISES],
      pageTitle: 'tgusurveyApp.userinfoEnterprise.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
