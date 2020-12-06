import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISpecialized } from 'app/shared/model/surveystore/specialized.model';
import { SpecializedService } from './specialized.service';
import { SpecializedDeleteDialogComponent } from './specialized-delete-dialog.component';

@Component({
  selector: 'jhi-specialized',
  templateUrl: './specialized.component.html',
})
export class SpecializedComponent implements OnInit, OnDestroy {
  specializeds?: ISpecialized[];
  eventSubscriber?: Subscription;

  constructor(
    protected specializedService: SpecializedService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.specializedService.query().subscribe((res: HttpResponse<ISpecialized[]>) => (this.specializeds = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSpecializeds();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISpecialized): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSpecializeds(): void {
    this.eventSubscriber = this.eventManager.subscribe('specializedListModification', () => this.loadAll());
  }

  delete(specialized: ISpecialized): void {
    const modalRef = this.modalService.open(SpecializedDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.specialized = specialized;
  }
}
