import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProgramItem } from 'app/shared/model/surveystore/program-item.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { ProgramItemService } from './program-item.service';
import { ProgramItemDeleteDialogComponent } from './program-item-delete-dialog.component';

@Component({
  selector: 'jhi-program-item',
  templateUrl: './program-item.component.html',
})
export class ProgramItemComponent implements OnInit, OnDestroy {
  programItems: IProgramItem[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected programItemService: ProgramItemService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.programItems = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.programItemService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IProgramItem[]>) => this.paginateProgramItems(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.programItems = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
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
    this.eventSubscriber = this.eventManager.subscribe('programItemListModification', () => this.reset());
  }

  delete(programItem: IProgramItem): void {
    const modalRef = this.modalService.open(ProgramItemDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.programItem = programItem;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateProgramItems(data: IProgramItem[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.programItems.push(data[i]);
      }
    }
  }
}
