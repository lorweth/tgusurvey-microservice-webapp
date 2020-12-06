import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISurveyHeader } from 'app/shared/model/surveystore/survey-header.model';
import { SurveyHeaderService } from './survey-header.service';

@Component({
  templateUrl: './survey-header-delete-dialog.component.html',
})
export class SurveyHeaderDeleteDialogComponent {
  surveyHeader?: ISurveyHeader;

  constructor(
    protected surveyHeaderService: SurveyHeaderService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.surveyHeaderService.delete(id).subscribe(() => {
      this.eventManager.broadcast('surveyHeaderListModification');
      this.activeModal.close();
    });
  }
}
