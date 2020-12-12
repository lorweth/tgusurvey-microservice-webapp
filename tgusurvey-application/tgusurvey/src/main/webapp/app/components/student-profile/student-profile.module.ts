import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TgusurveySharedModule } from 'app/shared/shared.module';
import { StudentProfileComponent } from './student-profile.component';
import { studentProfileRoute } from './student-profile.route';

@NgModule({
  imports: [TgusurveySharedModule, RouterModule.forChild(studentProfileRoute)],
  declarations: [StudentProfileComponent],
  entryComponents: [],
})
export class StudentProfileModule {}
