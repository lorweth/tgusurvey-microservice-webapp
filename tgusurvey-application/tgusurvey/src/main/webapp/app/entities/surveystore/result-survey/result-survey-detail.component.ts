import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IResultSurvey } from 'app/shared/model/surveystore/result-survey.model';

@Component({
  selector: 'jhi-result-survey-detail',
  templateUrl: './result-survey-detail.component.html',
})
export class ResultSurveyDetailComponent implements OnInit {
  resultSurvey: IResultSurvey | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ resultSurvey }) => (this.resultSurvey = resultSurvey));
  }

  previousState(): void {
    window.history.back();
  }
}
