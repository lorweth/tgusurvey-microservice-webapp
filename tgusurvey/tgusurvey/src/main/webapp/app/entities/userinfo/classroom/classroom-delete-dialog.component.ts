import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClassroom } from 'app/shared/model/userinfo/classroom.model';
import { ClassroomService } from './classroom.service';

@Component({
  templateUrl: './classroom-delete-dialog.component.html',
})
export class ClassroomDeleteDialogComponent {
  classroom?: IClassroom;

  constructor(protected classroomService: ClassroomService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.classroomService.delete(id).subscribe(() => {
      this.eventManager.broadcast('classroomListModification');
      this.activeModal.close();
    });
  }
}
