import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISurveyForm } from 'app/shared/model/surveystore/survey-form.model';

@Component({
  selector: 'jhi-survey-form-detail',
  templateUrl: './survey-form-detail.component.html',
})
export class SurveyFormDetailComponent implements OnInit {
  surveyForm: ISurveyForm | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ surveyForm }) => (this.surveyForm = surveyForm));
  }

  previousState(): void {
    window.history.back();
  }
}
