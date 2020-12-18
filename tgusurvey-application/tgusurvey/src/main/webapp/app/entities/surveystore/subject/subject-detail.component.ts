import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISubjectCondition } from 'app/shared/model/surveystore/subject-condition.model';

import { ISubject } from 'app/shared/model/surveystore/subject.model';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { SubjectConditionService } from '../subject-condition/subject-condition.service';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SubjectConditionDeleteDialogComponent } from '../subject-condition/subject-condition-delete-dialog.component';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-subject-detail',
  templateUrl: './subject-detail.component.html',
})
export class SubjectDetailComponent implements OnInit, OnDestroy {
  subject: ISubject | null = null;
  subjectConditions: ISubjectCondition[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected subjectConditionService: SubjectConditionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.subjectConditions = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadListSubjectCondition(): void {
    if (this.subject?.id !== undefined) {
      this.subjectConditionService
        .getConditionInSubject(this.subject.id, {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.sort(),
        })
        .subscribe((res: HttpResponse<ISubjectCondition[]>) => this.paginateSubjectConditions(res.body, res.headers));
    }
  }

  reset(): void {
    this.page = 0;
    this.subjectConditions = [];
    this.loadListSubjectCondition();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadListSubjectCondition();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subject }) => (this.subject = subject));
    this.loadListSubjectCondition();
    this.registerChangeInSubjectConditions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  previousState(): void {
    window.history.back();
  }

  trackId(index: number, item: ISubjectCondition): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSubjectConditions(): void {
    this.eventSubscriber = this.eventManager.subscribe('subjectConditionListModification', () => this.reset());
  }

  delete(subjectCondition: ISubjectCondition): void {
    const modalRef = this.modalService.open(SubjectConditionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subjectCondition = subjectCondition;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSubjectConditions(data: ISubjectCondition[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.subjectConditions.push(data[i]);
      }
    }
  }
}
