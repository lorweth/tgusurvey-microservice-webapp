import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEnterprise, Enterprise } from 'app/shared/model/userinfo/enterprise.model';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseComponent } from './enterprise.component';
import { EnterpriseDetailComponent } from './enterprise-detail.component';
import { EnterpriseUpdateComponent } from './enterprise-update.component';

@Injectable({ providedIn: 'root' })
export class EnterpriseResolve implements Resolve<IEnterprise> {
  constructor(private service: EnterpriseService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEnterprise> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((enterprise: HttpResponse<Enterprise>) => {
          if (enterprise.body) {
            return of(enterprise.body);
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

export const enterpriseRoute: Routes = [
  {
    path: '',
    component: EnterpriseComponent,
    data: {
      authorities: [Authority.ENTERPRISES, Authority.ADMIN],
      defaultSort: 'id,asc',
      pageTitle: 'tgusurveyApp.userinfoEnterprise.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EnterpriseDetailComponent,
    resolve: {
      enterprise: EnterpriseResolve,
    },
    data: {
      authorities: [Authority.ENTERPRISES, Authority.ADMIN],
      pageTitle: 'tgusurveyApp.userinfoEnterprise.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EnterpriseUpdateComponent,
    resolve: {
      enterprise: EnterpriseResolve,
    },
    data: {
      authorities: [Authority.ENTERPRISES, Authority.ADMIN],
      pageTitle: 'tgusurveyApp.userinfoEnterprise.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EnterpriseUpdateComponent,
    resolve: {
      enterprise: EnterpriseResolve,
    },
    data: {
      authorities: [Authority.ENTERPRISES, Authority.ADMIN],
      pageTitle: 'tgusurveyApp.userinfoEnterprise.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
