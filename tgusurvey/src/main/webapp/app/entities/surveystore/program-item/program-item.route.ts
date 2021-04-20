import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProgramItem, ProgramItem } from 'app/shared/model/surveystore/program-item.model';
import { ProgramItemService } from './program-item.service';
import { ProgramItemComponent } from './program-item.component';
import { ProgramItemDetailComponent } from './program-item-detail.component';
import { ProgramItemUpdateComponent } from './program-item-update.component';

@Injectable({ providedIn: 'root' })
export class ProgramItemResolve implements Resolve<IProgramItem> {
  constructor(private service: ProgramItemService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProgramItem> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((programItem: HttpResponse<ProgramItem>) => {
          if (programItem.body) {
            return of(programItem.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProgramItem());
  }
}

export const programItemRoute: Routes = [
  {
    path: '',
    component: ProgramItemComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreProgramItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ProgramItemDetailComponent,
    resolve: {
      programItem: ProgramItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreProgramItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ProgramItemUpdateComponent,
    resolve: {
      programItem: ProgramItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreProgramItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ProgramItemUpdateComponent,
    resolve: {
      programItem: ProgramItemResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tgusurveyApp.surveystoreProgramItem.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
