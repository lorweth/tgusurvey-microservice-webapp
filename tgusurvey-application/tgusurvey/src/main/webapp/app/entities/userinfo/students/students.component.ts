import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStudents } from 'app/shared/model/userinfo/students.model';
import { StudentsService } from './students.service';
import { StudentsDeleteDialogComponent } from './students-delete-dialog.component';

@Component({
  selector: 'jhi-students',
  templateUrl: './students.component.html',
})
export class StudentsComponent implements OnInit, OnDestroy {
  students?: IStudents[];
  eventSubscriber?: Subscription;

  constructor(protected studentsService: StudentsService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.studentsService.query().subscribe((res: HttpResponse<IStudents[]>) => (this.students = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInStudents();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IStudents): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInStudents(): void {
    this.eventSubscriber = this.eventManager.subscribe('studentsListModification', () => this.loadAll());
  }

  delete(students: IStudents): void {
    const modalRef = this.modalService.open(StudentsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.students = students;
  }
}
