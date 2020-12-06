import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStudents } from 'app/shared/model/userinfo/students.model';
import { StudentsService } from './students.service';

@Component({
  templateUrl: './students-delete-dialog.component.html',
})
export class StudentsDeleteDialogComponent {
  students?: IStudents;

  constructor(protected studentsService: StudentsService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.studentsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('studentsListModification');
      this.activeModal.close();
    });
  }
}
