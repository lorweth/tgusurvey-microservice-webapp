import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IResultSurvey } from 'app/shared/model/surveystore/result-survey.model';
import { ResultSurveyService } from './result-survey.service';
import { ResultSurveyDeleteDialogComponent } from './result-survey-delete-dialog.component';

@Component({
  selector: 'jhi-result-survey',
  templateUrl: './result-survey.component.html',
})
export class ResultSurveyComponent implements OnInit, OnDestroy {
  resultSurveys?: IResultSurvey[];
  eventSubscriber?: Subscription;

  constructor(
    protected resultSurveyService: ResultSurveyService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.resultSurveyService.query().subscribe((res: HttpResponse<IResultSurvey[]>) => (this.resultSurveys = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInResultSurveys();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IResultSurvey): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInResultSurveys(): void {
    this.eventSubscriber = this.eventManager.subscribe('resultSurveyListModification', () => this.loadAll());
  }

  delete(resultSurvey: IResultSurvey): void {
    const modalRef = this.modalService.open(ResultSurveyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.resultSurvey = resultSurvey;
  }
}
