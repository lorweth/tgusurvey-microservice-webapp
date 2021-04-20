import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILecturer } from 'app/shared/model/userinfo/lecturer.model';
import { LecturerService } from './lecturer.service';

@Component({
  templateUrl: './lecturer-delete-dialog.component.html',
})
export class LecturerDeleteDialogComponent {
  lecturer?: ILecturer;

  constructor(protected lecturerService: LecturerService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.lecturerService.delete(id).subscribe(() => {
      this.eventManager.broadcast('lecturerListModification');
      this.activeModal.close();
    });
  }
}
