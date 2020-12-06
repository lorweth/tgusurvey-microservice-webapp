import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubjectCondition } from 'app/shared/model/surveystore/subject-condition.model';
import { SubjectConditionService } from './subject-condition.service';
import { SubjectConditionDeleteDialogComponent } from './subject-condition-delete-dialog.component';

@Component({
  selector: 'jhi-subject-condition',
  templateUrl: './subject-condition.component.html',
})
export class SubjectConditionComponent implements OnInit, OnDestroy {
  subjectConditions?: ISubjectCondition[];
  eventSubscriber?: Subscription;

  constructor(
    protected subjectConditionService: SubjectConditionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.subjectConditionService.query().subscribe((res: HttpResponse<ISubjectCondition[]>) => (this.subjectConditions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSubjectConditions();
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

  registerChangeInSubjectConditions(): void {
    this.eventSubscriber = this.eventManager.subscribe('subjectConditionListModification', () => this.loadAll());
  }

  delete(subjectCondition: ISubjectCondition): void {
    const modalRef = this.modalService.open(SubjectConditionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subjectCondition = subjectCondition;
  }
}
