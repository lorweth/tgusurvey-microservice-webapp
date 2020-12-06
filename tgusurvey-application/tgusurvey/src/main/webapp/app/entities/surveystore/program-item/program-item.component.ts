import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProgramItem } from 'app/shared/model/surveystore/program-item.model';
import { ProgramItemService } from './program-item.service';
import { ProgramItemDeleteDialogComponent } from './program-item-delete-dialog.component';

@Component({
  selector: 'jhi-program-item',
  templateUrl: './program-item.component.html',
})
export class ProgramItemComponent implements OnInit, OnDestroy {
  programItems?: IProgramItem[];
  eventSubscriber?: Subscription;

  constructor(
    protected programItemService: ProgramItemService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.programItemService.query().subscribe((res: HttpResponse<IProgramItem[]>) => (this.programItems = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProgramItems();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProgramItem): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProgramItems(): void {
    this.eventSubscriber = this.eventManager.subscribe('programItemListModification', () => this.loadAll());
  }

  delete(programItem: IProgramItem): void {
    const modalRef = this.modalService.open(ProgramItemDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.programItem = programItem;
  }
}
