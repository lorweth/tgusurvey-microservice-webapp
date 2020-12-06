import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TgusurveySharedModule } from 'app/shared/shared.module';
import { ProgramItemComponent } from './program-item.component';
import { ProgramItemDetailComponent } from './program-item-detail.component';
import { ProgramItemUpdateComponent } from './program-item-update.component';
import { ProgramItemDeleteDialogComponent } from './program-item-delete-dialog.component';
import { programItemRoute } from './program-item.route';

@NgModule({
  imports: [TgusurveySharedModule, RouterModule.forChild(programItemRoute)],
  declarations: [ProgramItemComponent, ProgramItemDetailComponent, ProgramItemUpdateComponent, ProgramItemDeleteDialogComponent],
  entryComponents: [ProgramItemDeleteDialogComponent],
})
export class SurveystoreProgramItemModule {}
