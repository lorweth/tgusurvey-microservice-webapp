import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProgramItem, ProgramItem } from 'app/shared/model/surveystore/program-item.model';
import { ProgramItemService } from './program-item.service';
import { IEducationProgram } from 'app/shared/model/surveystore/education-program.model';
import { EducationProgramService } from 'app/entities/surveystore/education-program/education-program.service';
import { ISubject } from 'app/shared/model/surveystore/subject.model';
import { SubjectService } from 'app/entities/surveystore/subject/subject.service';

type SelectableEntity = IEducationProgram | ISubject;

@Component({
  selector: 'jhi-program-item-update',
  templateUrl: './program-item-update.component.html',
})
export class ProgramItemUpdateComponent implements OnInit {
  isSaving = false;
  educationprograms: IEducationProgram[] = [];
  subjects: ISubject[] = [];

  editForm = this.fb.group({
    id: [],
    category: [null, [Validators.required]],
    program: [],
    subject: [],
  });

  constructor(
    protected programItemService: ProgramItemService,
    protected educationProgramService: EducationProgramService,
    protected subjectService: SubjectService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ programItem }) => {
      this.updateForm(programItem);

      this.educationProgramService.query().subscribe((res: HttpResponse<IEducationProgram[]>) => (this.educationprograms = res.body || []));

      this.subjectService.query().subscribe((res: HttpResponse<ISubject[]>) => (this.subjects = res.body || []));
    });
  }

  updateForm(programItem: IProgramItem): void {
    this.editForm.patchValue({
      id: programItem.id,
      category: programItem.category,
      program: programItem.program,
      subject: programItem.subject,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const programItem = this.createFromForm();
    if (programItem.id !== undefined) {
      this.subscribeToSaveResponse(this.programItemService.update(programItem));
    } else {
      this.subscribeToSaveResponse(this.programItemService.create(programItem));
    }
  }

  private createFromForm(): IProgramItem {
    return {
      ...new ProgramItem(),
      id: this.editForm.get(['id'])!.value,
      category: this.editForm.get(['category'])!.value,
      program: this.editForm.get(['program'])!.value,
      subject: this.editForm.get(['subject'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProgramItem>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
