import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TgusurveySharedModule } from 'app/shared/shared.module';
import { EnterpriseProfileComponent } from './enterprise-profile.component';
import { enterpriseProfileRoute } from './enterprise-profile.route';

@NgModule({
  imports: [TgusurveySharedModule, RouterModule.forChild(enterpriseProfileRoute)],
  declarations: [EnterpriseProfileComponent],
  entryComponents: [],
})
export class EnterpriseProfileModule {}
