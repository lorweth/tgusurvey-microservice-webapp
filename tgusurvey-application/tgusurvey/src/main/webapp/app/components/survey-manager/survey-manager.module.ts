import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TgusurveySharedModule } from 'app/shared/shared.module';
import { SurveyDetailComponent } from './survey-detail.component';
import { SurveyEditComponent } from './survey-edit.component';

import { SurveyManagerComponent } from './survey-manager.component';
import { surveyFormManagerRoute } from './survey-manager.route';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SurveyStatisticsComponent } from './survey-statistics.component';

@NgModule({
  imports: [TgusurveySharedModule, RouterModule.forChild(surveyFormManagerRoute), NgxChartsModule],
  declarations: [SurveyManagerComponent, SurveyDetailComponent, SurveyEditComponent, SurveyStatisticsComponent],
  entryComponents: [SurveyStatisticsComponent],
})
export class SurveyManagerModule {}
