import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TgusurveySharedModule } from 'app/shared/shared.module';
import { EnterpriseComponent } from './enterprise.component';
import { EnterpriseDetailComponent } from './enterprise-detail.component';
import { EnterpriseUpdateComponent } from './enterprise-update.component';
import { EnterpriseDeleteDialogComponent } from './enterprise-delete-dialog.component';
import { enterpriseRoute } from './enterprise.route';

@NgModule({
  imports: [TgusurveySharedModule, RouterModule.forChild(enterpriseRoute)],
  declarations: [EnterpriseComponent, EnterpriseDetailComponent, EnterpriseUpdateComponent, EnterpriseDeleteDialogComponent],
  entryComponents: [EnterpriseDeleteDialogComponent],
})
export class UserinfoEnterpriseModule {}
