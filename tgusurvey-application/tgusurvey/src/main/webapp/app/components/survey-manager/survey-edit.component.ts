import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISurveyHeaderDTO } from 'app/shared/model/surveystore/header-dto.model';
import { IQuestionDTO } from 'app/shared/model/surveystore/question-dto.model';
import { ISectionDTO } from 'app/shared/model/surveystore/section-dto.model';
import { ISurveyFormDTO } from 'app/shared/model/surveystore/survey-form-dto.model';

@Component({
  selector: 'jhi-survey-edit',
  templateUrl: './survey-edit.component.html',
  styleUrls: ['./survey-manager.component.scss'],
})
export class SurveyEditComponent implements OnInit {
  surveyForm: ISurveyFormDTO | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ surveyForm }) => (this.surveyForm = surveyForm));
  }

  previousState(): void {
    window.history.back();
  }

  trackHeaderId(index: number, item: ISurveyHeaderDTO): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  trackSectionId(index: number, item: ISectionDTO): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  trackQuestionId(index: number, item: IQuestionDTO): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }
}
