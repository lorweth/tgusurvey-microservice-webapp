import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISurveyHeader } from 'app/shared/model/surveystore/survey-header.model';

@Component({
  selector: 'jhi-survey-header-detail',
  templateUrl: './survey-header-detail.component.html',
})
export class SurveyHeaderDetailComponent implements OnInit {
  surveyHeader: ISurveyHeader | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ surveyHeader }) => (this.surveyHeader = surveyHeader));
  }

  previousState(): void {
    window.history.back();
  }
}
