import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISpecialized, Specialized } from 'app/shared/model/surveystore/specialized.model';
import { SpecializedService } from './specialized.service';
import { SpecializedComponent } from './specialized.component';
import { SpecializedDetailComponent } from './specialized-detail.component';
import { SpecializedUpdateComponent } from './specialized-update.component';

@Injectable({ providedIn: 'root' })
export class SpecializedResolve implements Resolve<ISpecialized> {
  constructor(private service: SpecializedService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISpecialized> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((specialized: HttpResponse<Specialized>) => {
          if (specialized.body) {
            return of(specialized.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Specialized());
  }
}

export const specializedRoute: Routes = [
  {
    path: '',
    component: SpecializedComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'tgusurveyApp.surveystoreSpecialized.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SpecializedDetailComponent,
    resolve: {
      specialized: SpecializedResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreSpecialized.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SpecializedUpdateComponent,
    resolve: {
      specialized: SpecializedResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreSpecialized.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SpecializedUpdateComponent,
    resolve: {
      specialized: SpecializedResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreSpecialized.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
