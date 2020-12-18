import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISection, Section } from 'app/shared/model/surveystore/section.model';
import { SectionService } from './section.service';
import { ISurveyHeader } from 'app/shared/model/surveystore/survey-header.model';
import { SurveyHeaderService } from 'app/entities/surveystore/survey-header/survey-header.service';

@Component({
  selector: 'jhi-section-update',
  templateUrl: './section-update.component.html',
})
export class SectionUpdateComponent implements OnInit {
  isSaving = false;
  surveyheaders: ISurveyHeader[] = [];

  editForm = this.fb.group({
    id: [],
    stt: [null, [Validators.min(1)]],
    title: [null, [Validators.required]],
    header: [],
  });

  constructor(
    protected sectionService: SectionService,
    protected surveyHeaderService: SurveyHeaderService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ section }) => {
      this.updateForm(section);

      this.surveyHeaderService.query().subscribe((res: HttpResponse<ISurveyHeader[]>) => (this.surveyheaders = res.body || []));
    });
  }

  updateForm(section: ISection): void {
    this.editForm.patchValue({
      id: section.id,
      stt: section.stt,
      title: section.title,
      header: section.header,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const section = this.createFromForm();
    if (section.id !== undefined) {
      this.subscribeToSaveResponse(this.sectionService.update(section));
    } else {
      this.subscribeToSaveResponse(this.sectionService.create(section));
    }
  }

  private createFromForm(): ISection {
    return {
      ...new Section(),
      id: this.editForm.get(['id'])!.value,
      stt: this.editForm.get(['stt'])!.value,
      title: this.editForm.get(['title'])!.value,
      header: this.editForm.get(['header'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISection>>): void {
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

  trackById(index: number, item: ISurveyHeader): any {
    return item.id;
  }
}
