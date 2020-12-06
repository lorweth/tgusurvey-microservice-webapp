import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEnterprise } from 'app/shared/model/userinfo/enterprise.model';
import { EnterpriseService } from './enterprise.service';

@Component({
  templateUrl: './enterprise-delete-dialog.component.html',
})
export class EnterpriseDeleteDialogComponent {
  enterprise?: IEnterprise;

  constructor(
    protected enterpriseService: EnterpriseService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.enterpriseService.delete(id).subscribe(() => {
      this.eventManager.broadcast('enterpriseListModification');
      this.activeModal.close();
    });
  }
}
