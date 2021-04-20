import { ISurveyHeader } from 'app/shared/model/surveystore/survey-header.model';

export interface ISection {
  id?: number;
  stt?: number;
  title?: string;
  header?: ISurveyHeader;
}

export class Section implements ISection {
  constructor(public id?: number, public stt?: number, public title?: string, public header?: ISurveyHeader) {}
}
