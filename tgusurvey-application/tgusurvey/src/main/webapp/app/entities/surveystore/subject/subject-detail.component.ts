import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubject } from 'app/shared/model/surveystore/subject.model';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';

import { ISubjectCondition } from 'app/shared/model/surveystore/subject-condition.model';
import { SubjectConditionService } from 'app/entities/surveystore/subject-condition/subject-condition.service';
import { SubjectConditionDeleteDialogComponent } from 'app/entities/surveystore/subject-condition/subject-condition-delete-dialog.component';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-subject-detail',
  templateUrl: './subject-detail.component.html',
})
export class SubjectDetailComponent implements OnInit, OnDestroy {
  subject: ISubject | null = null;
  subjectConditions?: ISubjectCondition[];

  eventSubscriber?: Subscription;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected subjectConditionService: SubjectConditionService
  ) {}

  loadAll(): void {
    this.subjectConditionService
      .getListSubjectInProgram(this.subject?.id)
      .subscribe((res: HttpResponse<ISubjectCondition[]>) => (this.subjectConditions = res.body || []));
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subject }) => (this.subject = subject));
    this.loadAll();
  }

  previousState(): void {
    window.history.back();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISubjectCondition): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  delete(subjectCondition: ISubjectCondition): void {
    const modalRef = this.modalService.open(SubjectConditionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subjectCondition = subjectCondition;
  }
}
