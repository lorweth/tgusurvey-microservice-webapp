import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISurveyHeader } from 'app/shared/model/surveystore/survey-header.model';
import { SurveyHeaderService } from './survey-header.service';
import { SurveyHeaderDeleteDialogComponent } from './survey-header-delete-dialog.component';

@Component({
  selector: 'jhi-survey-header',
  templateUrl: './survey-header.component.html',
})
export class SurveyHeaderComponent implements OnInit, OnDestroy {
  surveyHeaders?: ISurveyHeader[];
  eventSubscriber?: Subscription;

  constructor(
    protected surveyHeaderService: SurveyHeaderService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.surveyHeaderService.query().subscribe((res: HttpResponse<ISurveyHeader[]>) => (this.surveyHeaders = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSurveyHeaders();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISurveyHeader): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSurveyHeaders(): void {
    this.eventSubscriber = this.eventManager.subscribe('surveyHeaderListModification', () => this.loadAll());
  }

  delete(surveyHeader: ISurveyHeader): void {
    const modalRef = this.modalService.open(SurveyHeaderDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.surveyHeader = surveyHeader;
  }
}
