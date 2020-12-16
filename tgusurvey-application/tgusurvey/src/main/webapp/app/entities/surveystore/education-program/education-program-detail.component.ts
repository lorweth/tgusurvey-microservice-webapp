import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEducationProgram } from 'app/shared/model/surveystore/education-program.model';
import { IProgramItem } from 'app/shared/model/surveystore/program-item.model';
import { ProgramItemDeleteDialogComponent } from '../program-item/program-item-delete-dialog.component';
import { ProgramItemService } from '../program-item/program-item.service';

@Component({
  selector: 'jhi-education-program-detail',
  templateUrl: './education-program-detail.component.html',
})
export class EducationProgramDetailComponent implements OnInit {
  educationProgram: IEducationProgram | null = null;
  programItems?: IProgramItem[];

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected programItemService: ProgramItemService,
    protected modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ educationProgram }) => (this.educationProgram = educationProgram));
    this.loadListSubject();
  }

  loadListSubject(): void {
    this.programItemService
      .getListSubjectInProgram(this.educationProgram?.id)
      .subscribe((res: HttpResponse<IProgramItem[]>) => (this.programItems = res.body || []));
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
}
