import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TgusurveySharedModule } from 'app/shared/shared.module';
import { EducationProgramComponent } from './education-program.component';
import { EducationProgramDetailComponent } from './education-program-detail.component';
import { EducationProgramUpdateComponent } from './education-program-update.component';
import { EducationProgramDeleteDialogComponent } from './education-program-delete-dialog.component';
import { educationProgramRoute } from './education-program.route';

@NgModule({
  imports: [TgusurveySharedModule, RouterModule.forChild(educationProgramRoute)],
  declarations: [
    EducationProgramComponent,
    EducationProgramDetailComponent,
    EducationProgramUpdateComponent,
    EducationProgramDeleteDialogComponent,
  ],
  entryComponents: [EducationProgramDeleteDialogComponent],
})
export class SurveystoreEducationProgramModule {}
