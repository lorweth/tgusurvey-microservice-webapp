import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'personal-info',
        loadChildren: () => import('./personal-info/personal-info.module').then(m => m.PersionalInfoModule),
      },
      {
        path: 'student-profile',
        loadChildren: () => import('./student-profile/student-profile.module').then(m => m.StudentProfileModule),
      },
      {
        path: 'lecturer-profile',
        loadChildren: () => import('./lecturer-profile/lecturer-profile.module').then(m => m.LecturerProfileModule),
      },
      {
        path: 'enterprise-profile',
        loadChildren: () => import('./enterprise-profile/enterprise-profile.module').then(m => m.EnterpriseProfileModule),
      },
    ]),
  ],
})
export class TgusurveyComponentModule {}
