import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TgusurveySharedModule } from 'app/shared/shared.module';
import { ClassroomComponent } from './classroom.component';
import { ClassroomDetailComponent } from './classroom-detail.component';
import { ClassroomUpdateComponent } from './classroom-update.component';
import { ClassroomDeleteDialogComponent } from './classroom-delete-dialog.component';
import { classroomRoute } from './classroom.route';

@NgModule({
  imports: [TgusurveySharedModule, RouterModule.forChild(classroomRoute)],
  declarations: [ClassroomComponent, ClassroomDetailComponent, ClassroomUpdateComponent, ClassroomDeleteDialogComponent],
  entryComponents: [ClassroomDeleteDialogComponent],
})
export class UserinfoClassroomModule {}
