import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISurveyFormDTO } from 'app/shared/model/surveystore/survey-form-dto.model';

@Component({
  selector: 'jhi-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-manager.component.scss'],
})
export class SurveyDetailComponent implements OnInit {
  surveyForm: ISurveyFormDTO | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ surveyForm }) => (this.surveyForm = surveyForm));
  }

  previousState(): void {
    window.history.back();
  }
}
