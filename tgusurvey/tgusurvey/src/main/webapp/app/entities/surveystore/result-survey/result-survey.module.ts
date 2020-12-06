import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TgusurveySharedModule } from 'app/shared/shared.module';
import { ResultSurveyComponent } from './result-survey.component';
import { ResultSurveyDetailComponent } from './result-survey-detail.component';
import { ResultSurveyUpdateComponent } from './result-survey-update.component';
import { ResultSurveyDeleteDialogComponent } from './result-survey-delete-dialog.component';
import { resultSurveyRoute } from './result-survey.route';

@NgModule({
  imports: [TgusurveySharedModule, RouterModule.forChild(resultSurveyRoute)],
  declarations: [ResultSurveyComponent, ResultSurveyDetailComponent, ResultSurveyUpdateComponent, ResultSurveyDeleteDialogComponent],
  entryComponents: [ResultSurveyDeleteDialogComponent],
})
export class SurveystoreResultSurveyModule {}
