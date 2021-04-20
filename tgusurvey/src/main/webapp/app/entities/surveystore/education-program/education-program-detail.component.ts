import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';

import { IEducationProgram } from 'app/shared/model/surveystore/education-program.model';
import { IProgramItem } from 'app/shared/model/surveystore/program-item.model';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { ProgramItemDeleteDialogComponent } from '../program-item/program-item-delete-dialog.component';
import { ProgramItemService } from '../program-item/program-item.service';

@Component({
  selector: 'jhi-education-program-detail',
  templateUrl: './education-program-detail.component.html',
})
export class EducationProgramDetailComponent implements OnInit, OnDestroy {
  educationProgram: IEducationProgram | null = null;

  programItems: IProgramItem[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected activatedRoute: ActivatedRoute,
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

  loadItemList(): void {
    if (this.educationProgram?.id !== undefined)
      this.programItemService
        .getItemInProgram(this.educationProgram?.id, {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.sort(),
        })
        .subscribe((res: HttpResponse<IProgramItem[]>) => this.paginateProgramItems(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.programItems = [];
    this.loadItemList();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadItemList();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ educationProgram }) => (this.educationProgram = educationProgram));
    this.loadItemList();
    this.registerChangeInProgramItems();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  previousState(): void {
    window.history.back();
  }

  trackId(index: number, item: IProgramItem): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  delete(programItem: IProgramItem): void {
    const modalRef = this.modalService.open(ProgramItemDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.programItem = programItem;
  }

  registerChangeInProgramItems(): void {
    this.eventSubscriber = this.eventManager.subscribe('programItemListModification', () => this.reset());
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
