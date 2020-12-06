import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEducationProgram } from 'app/shared/model/surveystore/education-program.model';
import { EducationProgramService } from './education-program.service';

@Component({
  templateUrl: './education-program-delete-dialog.component.html',
})
export class EducationProgramDeleteDialogComponent {
  educationProgram?: IEducationProgram;

  constructor(
    protected educationProgramService: EducationProgramService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.educationProgramService.delete(id).subscribe(() => {
      this.eventManager.broadcast('educationProgramListModification');
      this.activeModal.close();
    });
  }
}
