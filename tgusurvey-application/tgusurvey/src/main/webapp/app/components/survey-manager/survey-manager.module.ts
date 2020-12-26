import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TgusurveySharedModule } from 'app/shared/shared.module';
import { SurveyDetailComponent } from './survey-detail.component';

import { SurveyManagerComponent } from './survey-manager.component';
import { surveyFormManagerRoute } from './survey-manager.route';

@NgModule({
  imports: [TgusurveySharedModule, RouterModule.forChild(surveyFormManagerRoute)],
  declarations: [SurveyManagerComponent, SurveyDetailComponent],
  entryComponents: [],
})
export class SurveyManagerModule {}
