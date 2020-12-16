import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TgusurveySharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [TgusurveySharedModule, RouterModule.forChild([HOME_ROUTE]), BrowserAnimationsModule, NgxChartsModule],
  declarations: [HomeComponent],
})
export class TgusurveyHomeModule {}
