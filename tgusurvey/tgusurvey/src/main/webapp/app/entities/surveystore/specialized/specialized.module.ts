import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TgusurveySharedModule } from 'app/shared/shared.module';
import { SpecializedComponent } from './specialized.component';
import { SpecializedDetailComponent } from './specialized-detail.component';
import { SpecializedUpdateComponent } from './specialized-update.component';
import { SpecializedDeleteDialogComponent } from './specialized-delete-dialog.component';
import { specializedRoute } from './specialized.route';

@NgModule({
  imports: [TgusurveySharedModule, RouterModule.forChild(specializedRoute)],
  declarations: [SpecializedComponent, SpecializedDetailComponent, SpecializedUpdateComponent, SpecializedDeleteDialogComponent],
  entryComponents: [SpecializedDeleteDialogComponent],
})
export class SurveystoreSpecializedModule {}
