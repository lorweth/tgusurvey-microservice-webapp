import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubjectCondition } from 'app/shared/model/surveystore/subject-condition.model';
import { SubjectConditionService } from './subject-condition.service';

@Component({
  templateUrl: './subject-condition-delete-dialog.component.html',
})
export class SubjectConditionDeleteDialogComponent {
  subjectCondition?: ISubjectCondition;

  constructor(
    protected subjectConditionService: SubjectConditionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.subjectConditionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('subjectConditionListModification');
      this.activeModal.close();
    });
  }
}
