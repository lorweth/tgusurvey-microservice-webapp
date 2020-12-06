import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TgusurveySharedModule } from 'app/shared/shared.module';
import { SubjectConditionComponent } from './subject-condition.component';
import { SubjectConditionDetailComponent } from './subject-condition-detail.component';
import { SubjectConditionUpdateComponent } from './subject-condition-update.component';
import { SubjectConditionDeleteDialogComponent } from './subject-condition-delete-dialog.component';
import { subjectConditionRoute } from './subject-condition.route';

@NgModule({
  imports: [TgusurveySharedModule, RouterModule.forChild(subjectConditionRoute)],
  declarations: [
    SubjectConditionComponent,
    SubjectConditionDetailComponent,
    SubjectConditionUpdateComponent,
    SubjectConditionDeleteDialogComponent,
  ],
  entryComponents: [SubjectConditionDeleteDialogComponent],
})
export class SurveystoreSubjectConditionModule {}
