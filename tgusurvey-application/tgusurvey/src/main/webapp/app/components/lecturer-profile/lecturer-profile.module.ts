import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TgusurveySharedModule } from 'app/shared/shared.module';
import { LecturerProfileComponent } from './lecturer-profile.component';
import { lecturerProfileRoute } from './lecturer-profile.route';

@NgModule({
  imports: [TgusurveySharedModule, RouterModule.forChild(lecturerProfileRoute)],
  declarations: [LecturerProfileComponent],
  entryComponents: [],
})
export class LecturerProfileModule {}
