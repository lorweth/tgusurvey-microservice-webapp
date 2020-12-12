import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'personal-info',
        loadChildren: () => import('./personal-info/personal-info.module').then(m => m.PersionalInfoModule),
      },
    ]),
  ],
})
export class TgusurveyComponentModule {}
