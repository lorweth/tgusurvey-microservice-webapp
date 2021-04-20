import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TgusurveySharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [TgusurveySharedModule, RouterModule.forChild([HOME_ROUTE]), BrowserAnimationsModule],
  declarations: [HomeComponent],
})
export class TgusurveyHomeModule {}
