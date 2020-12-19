import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISurveyHeader } from 'app/shared/model/surveystore/survey-header.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SurveyHeaderService } from './survey-header.service';
import { SurveyHeaderDeleteDialogComponent } from './survey-header-delete-dialog.component';

@Component({
  selector: 'jhi-survey-header',
  templateUrl: './survey-header.component.html',
})
export class SurveyHeaderComponent implements OnInit, OnDestroy {
  surveyHeaders: ISurveyHeader[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected surveyHeaderService: SurveyHeaderService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.surveyHeaders = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.surveyHeaderService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<ISurveyHeader[]>) => this.paginateSurveyHeaders(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.surveyHeaders = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
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
    this.eventSubscriber = this.eventManager.subscribe('surveyHeaderListModification', () => this.reset());
  }

  delete(surveyHeader: ISurveyHeader): void {
    const modalRef = this.modalService.open(SurveyHeaderDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.surveyHeader = surveyHeader;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSurveyHeaders(data: ISurveyHeader[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.surveyHeaders.push(data[i]);
      }
    }
  }
}
