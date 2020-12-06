import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISpecialized } from 'app/shared/model/surveystore/specialized.model';
import { SpecializedService } from './specialized.service';

@Component({
  templateUrl: './specialized-delete-dialog.component.html',
})
export class SpecializedDeleteDialogComponent {
  specialized?: ISpecialized;

  constructor(
    protected specializedService: SpecializedService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.specializedService.delete(id).subscribe(() => {
      this.eventManager.broadcast('specializedListModification');
      this.activeModal.close();
    });
  }
}
