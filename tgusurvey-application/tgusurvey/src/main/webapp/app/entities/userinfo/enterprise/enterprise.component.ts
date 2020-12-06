import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEnterprise } from 'app/shared/model/userinfo/enterprise.model';
import { EnterpriseService } from './enterprise.service';
import { EnterpriseDeleteDialogComponent } from './enterprise-delete-dialog.component';

@Component({
  selector: 'jhi-enterprise',
  templateUrl: './enterprise.component.html',
})
export class EnterpriseComponent implements OnInit, OnDestroy {
  enterprises?: IEnterprise[];
  eventSubscriber?: Subscription;

  constructor(protected enterpriseService: EnterpriseService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.enterpriseService.query().subscribe((res: HttpResponse<IEnterprise[]>) => (this.enterprises = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEnterprises();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEnterprise): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEnterprises(): void {
    this.eventSubscriber = this.eventManager.subscribe('enterpriseListModification', () => this.loadAll());
  }

  delete(enterprise: IEnterprise): void {
    const modalRef = this.modalService.open(EnterpriseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.enterprise = enterprise;
  }
}
