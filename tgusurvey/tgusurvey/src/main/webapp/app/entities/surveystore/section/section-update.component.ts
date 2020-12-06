import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { ISection, Section } from 'app/shared/model/surveystore/section.model';
import { SectionService } from './section.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
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
    stt: [null, [Validators.required, Validators.min(1)]],
    title: [null, [Validators.required]],
    comment: [],
    header: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
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
      comment: section.comment,
      header: section.header,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('tgusurveyApp.error', { ...err, key: 'error.file.' + err.key })
      );
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
      comment: this.editForm.get(['comment'])!.value,
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
