import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TgusurveySharedModule } from 'app/shared/shared.module';
import { SurveyFormComponent } from './survey-form.component';
import { SurveyFormDetailComponent } from './survey-form-detail.component';
import { SurveyFormUpdateComponent } from './survey-form-update.component';
import { SurveyFormDeleteDialogComponent } from './survey-form-delete-dialog.component';
import { surveyFormRoute } from './survey-form.route';

@NgModule({
  imports: [TgusurveySharedModule, RouterModule.forChild(surveyFormRoute)],
  declarations: [SurveyFormComponent, SurveyFormDetailComponent, SurveyFormUpdateComponent, SurveyFormDeleteDialogComponent],
  entryComponents: [SurveyFormDeleteDialogComponent],
})
export class SurveystoreSurveyFormModule {}
