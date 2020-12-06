import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TgusurveySharedModule } from 'app/shared/shared.module';
import { SurveyHeaderComponent } from './survey-header.component';
import { SurveyHeaderDetailComponent } from './survey-header-detail.component';
import { SurveyHeaderUpdateComponent } from './survey-header-update.component';
import { SurveyHeaderDeleteDialogComponent } from './survey-header-delete-dialog.component';
import { surveyHeaderRoute } from './survey-header.route';

@NgModule({
  imports: [TgusurveySharedModule, RouterModule.forChild(surveyHeaderRoute)],
  declarations: [SurveyHeaderComponent, SurveyHeaderDetailComponent, SurveyHeaderUpdateComponent, SurveyHeaderDeleteDialogComponent],
  entryComponents: [SurveyHeaderDeleteDialogComponent],
})
export class SurveystoreSurveyHeaderModule {}
