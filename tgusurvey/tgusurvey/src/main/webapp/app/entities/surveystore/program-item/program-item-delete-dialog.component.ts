import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProgramItem } from 'app/shared/model/surveystore/program-item.model';
import { ProgramItemService } from './program-item.service';

@Component({
  templateUrl: './program-item-delete-dialog.component.html',
})
export class ProgramItemDeleteDialogComponent {
  programItem?: IProgramItem;

  constructor(
    protected programItemService: ProgramItemService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.programItemService.delete(id).subscribe(() => {
      this.eventManager.broadcast('programItemListModification');
      this.activeModal.close();
    });
  }
}
