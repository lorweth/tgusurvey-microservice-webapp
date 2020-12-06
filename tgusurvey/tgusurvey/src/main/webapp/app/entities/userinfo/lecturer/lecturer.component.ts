import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ILecturer } from 'app/shared/model/userinfo/lecturer.model';
import { LecturerService } from './lecturer.service';
import { LecturerDeleteDialogComponent } from './lecturer-delete-dialog.component';

@Component({
  selector: 'jhi-lecturer',
  templateUrl: './lecturer.component.html',
})
export class LecturerComponent implements OnInit, OnDestroy {
  lecturers?: ILecturer[];
  eventSubscriber?: Subscription;

  constructor(
    protected lecturerService: LecturerService,
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.lecturerService.query().subscribe((res: HttpResponse<ILecturer[]>) => (this.lecturers = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInLecturers();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ILecturer): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInLecturers(): void {
    this.eventSubscriber = this.eventManager.subscribe('lecturerListModification', () => this.loadAll());
  }

  delete(lecturer: ILecturer): void {
    const modalRef = this.modalService.open(LecturerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.lecturer = lecturer;
  }
}
