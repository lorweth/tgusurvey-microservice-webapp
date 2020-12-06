import { ISurveyForm } from 'app/shared/model/surveystore/survey-form.model';

export interface ISurveyHeader {
  id?: number;
  stt?: number;
  title?: string;
  surveyForm?: ISurveyForm;
}

export class SurveyHeader implements ISurveyHeader {
  constructor(public id?: number, public stt?: number, public title?: string, public surveyForm?: ISurveyForm) {}
}
