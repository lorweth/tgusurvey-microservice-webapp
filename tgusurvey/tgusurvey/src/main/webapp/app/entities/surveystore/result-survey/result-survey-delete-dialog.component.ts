import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IResultSurvey } from 'app/shared/model/surveystore/result-survey.model';
import { ResultSurveyService } from './result-survey.service';

@Component({
  templateUrl: './result-survey-delete-dialog.component.html',
})
export class ResultSurveyDeleteDialogComponent {
  resultSurvey?: IResultSurvey;

  constructor(
    protected resultSurveyService: ResultSurveyService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.resultSurveyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('resultSurveyListModification');
      this.activeModal.close();
    });
  }
}
