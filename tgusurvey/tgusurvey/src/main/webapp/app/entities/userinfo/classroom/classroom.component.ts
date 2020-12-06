import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IClassroom } from 'app/shared/model/userinfo/classroom.model';
import { ClassroomService } from './classroom.service';
import { ClassroomDeleteDialogComponent } from './classroom-delete-dialog.component';

@Component({
  selector: 'jhi-classroom',
  templateUrl: './classroom.component.html',
})
export class ClassroomComponent implements OnInit, OnDestroy {
  classrooms?: IClassroom[];
  eventSubscriber?: Subscription;

  constructor(protected classroomService: ClassroomService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.classroomService.query().subscribe((res: HttpResponse<IClassroom[]>) => (this.classrooms = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInClassrooms();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IClassroom): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInClassrooms(): void {
    this.eventSubscriber = this.eventManager.subscribe('classroomListModification', () => this.loadAll());
  }

  delete(classroom: IClassroom): void {
    const modalRef = this.modalService.open(ClassroomDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.classroom = classroom;
  }
}
