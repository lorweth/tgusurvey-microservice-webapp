import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TgusurveySharedModule } from 'app/shared/shared.module';
import { PersonalInfoComponent } from './personal-info.component';
import { personalInfoRoute } from './personal-info.route';

@NgModule({
  imports: [TgusurveySharedModule, RouterModule.forChild(personalInfoRoute)],
  declarations: [PersonalInfoComponent],
  entryComponents: [],
})
export class PersionalInfoModule {}
