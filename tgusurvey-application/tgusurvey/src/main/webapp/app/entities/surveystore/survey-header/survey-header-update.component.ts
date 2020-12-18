import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISurveyHeader, SurveyHeader } from 'app/shared/model/surveystore/survey-header.model';
import { SurveyHeaderService } from './survey-header.service';
import { ISurveyForm } from 'app/shared/model/surveystore/survey-form.model';
import { SurveyFormService } from 'app/entities/surveystore/survey-form/survey-form.service';

@Component({
  selector: 'jhi-survey-header-update',
  templateUrl: './survey-header-update.component.html',
})
export class SurveyHeaderUpdateComponent implements OnInit {
  isSaving = false;
  surveyforms: ISurveyForm[] = [];

  editForm = this.fb.group({
    id: [],
    stt: [null, [Validators.min(1)]],
    title: [null, [Validators.required]],
    surveyForm: [],
  });

  constructor(
    protected surveyHeaderService: SurveyHeaderService,
    protected surveyFormService: SurveyFormService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ surveyHeader }) => {
      this.updateForm(surveyHeader);

      this.surveyFormService.query().subscribe((res: HttpResponse<ISurveyForm[]>) => (this.surveyforms = res.body || []));
    });
  }

  updateForm(surveyHeader: ISurveyHeader): void {
    this.editForm.patchValue({
      id: surveyHeader.id,
      stt: surveyHeader.stt,
      title: surveyHeader.title,
      surveyForm: surveyHeader.surveyForm,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const surveyHeader = this.createFromForm();
    if (surveyHeader.id !== undefined) {
      this.subscribeToSaveResponse(this.surveyHeaderService.update(surveyHeader));
    } else {
      this.subscribeToSaveResponse(this.surveyHeaderService.create(surveyHeader));
    }
  }

  private createFromForm(): ISurveyHeader {
    return {
      ...new SurveyHeader(),
      id: this.editForm.get(['id'])!.value,
      stt: this.editForm.get(['stt'])!.value,
      title: this.editForm.get(['title'])!.value,
      surveyForm: this.editForm.get(['surveyForm'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISurveyHeader>>): void {
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

  trackById(index: number, item: ISurveyForm): any {
    return item.id;
  }
}
