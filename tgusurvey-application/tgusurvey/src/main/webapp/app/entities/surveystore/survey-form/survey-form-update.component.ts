import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ISurveyForm, SurveyForm } from 'app/shared/model/surveystore/survey-form.model';
import { SurveyFormService } from './survey-form.service';
import { IEducationProgram } from 'app/shared/model/surveystore/education-program.model';
import { EducationProgramService } from 'app/entities/surveystore/education-program/education-program.service';

@Component({
  selector: 'jhi-survey-form-update',
  templateUrl: './survey-form-update.component.html',
})
export class SurveyFormUpdateComponent implements OnInit {
  isSaving = false;
  educationprograms: IEducationProgram[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    note: [],
    startDate: [],
    endDate: [],
    program: [],
  });

  constructor(
    protected surveyFormService: SurveyFormService,
    protected educationProgramService: EducationProgramService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ surveyForm }) => {
      if (!surveyForm.id) {
        const today = moment().startOf('day');
        surveyForm.startDate = today;
        surveyForm.endDate = today;
      }

      this.updateForm(surveyForm);

      this.educationProgramService.query().subscribe((res: HttpResponse<IEducationProgram[]>) => (this.educationprograms = res.body || []));
    });
  }

  updateForm(surveyForm: ISurveyForm): void {
    this.editForm.patchValue({
      id: surveyForm.id,
      name: surveyForm.name,
      note: surveyForm.note,
      startDate: surveyForm.startDate ? surveyForm.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: surveyForm.endDate ? surveyForm.endDate.format(DATE_TIME_FORMAT) : null,
      program: surveyForm.program,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const surveyForm = this.createFromForm();
    if (surveyForm.id !== undefined) {
      this.subscribeToSaveResponse(this.surveyFormService.update(surveyForm));
    } else {
      this.subscribeToSaveResponse(this.surveyFormService.create(surveyForm));
    }
  }

  private createFromForm(): ISurveyForm {
    return {
      ...new SurveyForm(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      note: this.editForm.get(['note'])!.value,
      startDate: this.editForm.get(['startDate'])!.value ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      program: this.editForm.get(['program'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISurveyForm>>): void {
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

  trackById(index: number, item: IEducationProgram): any {
    return item.id;
  }
}
