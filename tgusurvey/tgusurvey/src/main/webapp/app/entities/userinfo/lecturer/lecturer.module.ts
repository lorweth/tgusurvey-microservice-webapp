import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TgusurveySharedModule } from 'app/shared/shared.module';
import { LecturerComponent } from './lecturer.component';
import { LecturerDetailComponent } from './lecturer-detail.component';
import { LecturerUpdateComponent } from './lecturer-update.component';
import { LecturerDeleteDialogComponent } from './lecturer-delete-dialog.component';
import { lecturerRoute } from './lecturer.route';

@NgModule({
  imports: [TgusurveySharedModule, RouterModule.forChild(lecturerRoute)],
  declarations: [LecturerComponent, LecturerDetailComponent, LecturerUpdateComponent, LecturerDeleteDialogComponent],
  entryComponents: [LecturerDeleteDialogComponent],
})
export class UserinfoLecturerModule {}
