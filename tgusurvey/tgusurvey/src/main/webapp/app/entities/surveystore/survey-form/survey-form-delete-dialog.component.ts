import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISurveyForm } from 'app/shared/model/surveystore/survey-form.model';
import { SurveyFormService } from './survey-form.service';

@Component({
  templateUrl: './survey-form-delete-dialog.component.html',
})
export class SurveyFormDeleteDialogComponent {
  surveyForm?: ISurveyForm;

  constructor(
    protected surveyFormService: SurveyFormService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.surveyFormService.delete(id).subscribe(() => {
      this.eventManager.broadcast('surveyFormListModification');
      this.activeModal.close();
    });
  }
}
