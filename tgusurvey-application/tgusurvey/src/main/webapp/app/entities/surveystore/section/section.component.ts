import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISection } from 'app/shared/model/surveystore/section.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { SectionService } from './section.service';
import { SectionDeleteDialogComponent } from './section-delete-dialog.component';

@Component({
  selector: 'jhi-section',
  templateUrl: './section.component.html',
})
export class SectionComponent implements OnInit, OnDestroy {
  sections: ISection[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected sectionService: SectionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.sections = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.sectionService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<ISection[]>) => this.paginateSections(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.sections = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSections();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISection): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSections(): void {
    this.eventSubscriber = this.eventManager.subscribe('sectionListModification', () => this.reset());
  }

  delete(section: ISection): void {
    const modalRef = this.modalService.open(SectionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.section = section;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateSections(data: ISection[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.sections.push(data[i]);
      }
    }
  }
}
