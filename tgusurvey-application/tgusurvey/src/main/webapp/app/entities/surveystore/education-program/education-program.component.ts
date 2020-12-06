import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEducationProgram } from 'app/shared/model/surveystore/education-program.model';
import { EducationProgramService } from './education-program.service';
import { EducationProgramDeleteDialogComponent } from './education-program-delete-dialog.component';

@Component({
  selector: 'jhi-education-program',
  templateUrl: './education-program.component.html',
})
export class EducationProgramComponent implements OnInit, OnDestroy {
  educationPrograms?: IEducationProgram[];
  eventSubscriber?: Subscription;

  constructor(
    protected educationProgramService: EducationProgramService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.educationProgramService.query().subscribe((res: HttpResponse<IEducationProgram[]>) => (this.educationPrograms = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEducationPrograms();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEducationProgram): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEducationPrograms(): void {
    this.eventSubscriber = this.eventManager.subscribe('educationProgramListModification', () => this.loadAll());
  }

  delete(educationProgram: IEducationProgram): void {
    const modalRef = this.modalService.open(EducationProgramDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.educationProgram = educationProgram;
  }
}
