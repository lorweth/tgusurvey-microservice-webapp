import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISurveyForm } from 'app/shared/model/surveystore/survey-form.model';
import { SurveyFormService } from './survey-form.service';
import { SurveyFormDeleteDialogComponent } from './survey-form-delete-dialog.component';

@Component({
  selector: 'jhi-survey-form',
  templateUrl: './survey-form.component.html',
})
export class SurveyFormComponent implements OnInit, OnDestroy {
  surveyForms?: ISurveyForm[];
  eventSubscriber?: Subscription;

  constructor(protected surveyFormService: SurveyFormService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.surveyFormService.query().subscribe((res: HttpResponse<ISurveyForm[]>) => (this.surveyForms = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSurveyForms();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISurveyForm): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSurveyForms(): void {
    this.eventSubscriber = this.eventManager.subscribe('surveyFormListModification', () => this.loadAll());
  }

  delete(surveyForm: ISurveyForm): void {
    const modalRef = this.modalService.open(SurveyFormDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.surveyForm = surveyForm;
  }
}
