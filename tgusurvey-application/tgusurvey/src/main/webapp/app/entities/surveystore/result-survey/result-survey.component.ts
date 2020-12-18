import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IResultSurvey } from 'app/shared/model/surveystore/result-survey.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ResultSurveyService } from './result-survey.service';
import { ResultSurveyDeleteDialogComponent } from './result-survey-delete-dialog.component';

@Component({
  selector: 'jhi-result-survey',
  templateUrl: './result-survey.component.html',
})
export class ResultSurveyComponent implements OnInit, OnDestroy {
  resultSurveys: IResultSurvey[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected resultSurveyService: ResultSurveyService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.resultSurveys = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.resultSurveyService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IResultSurvey[]>) => this.paginateResultSurveys(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.resultSurveys = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
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
    this.eventSubscriber = this.eventManager.subscribe('resultSurveyListModification', () => this.reset());
  }

  delete(resultSurvey: IResultSurvey): void {
    const modalRef = this.modalService.open(ResultSurveyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.resultSurvey = resultSurvey;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateResultSurveys(data: IResultSurvey[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.resultSurveys.push(data[i]);
      }
    }
  }
}
