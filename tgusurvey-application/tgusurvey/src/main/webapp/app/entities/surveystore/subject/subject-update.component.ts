import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISubject, Subject } from 'app/shared/model/surveystore/subject.model';
import { SubjectService } from './subject.service';

@Component({
  selector: 'jhi-subject-update',
  templateUrl: './subject-update.component.html',
})
export class SubjectUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    msmh: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
    name: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
    numOfCredit: [null, [Validators.required, Validators.min(2), Validators.max(60)]],
    theoryLesson: [null, [Validators.required, Validators.min(2), Validators.max(60)]],
    practiceLesson: [null, [Validators.required, Validators.min(2), Validators.max(60)]],
  });

  constructor(protected subjectService: SubjectService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subject }) => {
      this.updateForm(subject);
    });
  }

  updateForm(subject: ISubject): void {
    this.editForm.patchValue({
      id: subject.id,
      msmh: subject.msmh,
      name: subject.name,
      numOfCredit: subject.numOfCredit,
      theoryLesson: subject.theoryLesson,
      practiceLesson: subject.practiceLesson,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subject = this.createFromForm();
    if (subject.id !== undefined) {
      this.subscribeToSaveResponse(this.subjectService.update(subject));
    } else {
      this.subscribeToSaveResponse(this.subjectService.create(subject));
    }
  }

  private createFromForm(): ISubject {
    return {
      ...new Subject(),
      id: this.editForm.get(['id'])!.value,
      msmh: this.editForm.get(['msmh'])!.value,
      name: this.editForm.get(['name'])!.value,
      numOfCredit: this.editForm.get(['numOfCredit'])!.value,
      theoryLesson: this.editForm.get(['theoryLesson'])!.value,
      practiceLesson: this.editForm.get(['practiceLesson'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubject>>): void {
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
}
