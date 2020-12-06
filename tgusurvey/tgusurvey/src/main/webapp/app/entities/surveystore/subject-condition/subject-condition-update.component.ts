import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISubjectCondition, SubjectCondition } from 'app/shared/model/surveystore/subject-condition.model';
import { SubjectConditionService } from './subject-condition.service';
import { ISubject } from 'app/shared/model/surveystore/subject.model';
import { SubjectService } from 'app/entities/surveystore/subject/subject.service';

@Component({
  selector: 'jhi-subject-condition-update',
  templateUrl: './subject-condition-update.component.html',
})
export class SubjectConditionUpdateComponent implements OnInit {
  isSaving = false;
  subjects: ISubject[] = [];

  editForm = this.fb.group({
    id: [],
    constraint: [null, [Validators.required]],
    subject: [],
    beforeSubject: [],
  });

  constructor(
    protected subjectConditionService: SubjectConditionService,
    protected subjectService: SubjectService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subjectCondition }) => {
      this.updateForm(subjectCondition);

      this.subjectService.query().subscribe((res: HttpResponse<ISubject[]>) => (this.subjects = res.body || []));
    });
  }

  updateForm(subjectCondition: ISubjectCondition): void {
    this.editForm.patchValue({
      id: subjectCondition.id,
      constraint: subjectCondition.constraint,
      subject: subjectCondition.subject,
      beforeSubject: subjectCondition.beforeSubject,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subjectCondition = this.createFromForm();
    if (subjectCondition.id !== undefined) {
      this.subscribeToSaveResponse(this.subjectConditionService.update(subjectCondition));
    } else {
      this.subscribeToSaveResponse(this.subjectConditionService.create(subjectCondition));
    }
  }

  private createFromForm(): ISubjectCondition {
    return {
      ...new SubjectCondition(),
      id: this.editForm.get(['id'])!.value,
      constraint: this.editForm.get(['constraint'])!.value,
      subject: this.editForm.get(['subject'])!.value,
      beforeSubject: this.editForm.get(['beforeSubject'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubjectCondition>>): void {
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

  trackById(index: number, item: ISubject): any {
    return item.id;
  }
}
