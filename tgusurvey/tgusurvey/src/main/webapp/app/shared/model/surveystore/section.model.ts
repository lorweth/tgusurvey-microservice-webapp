import { ISurveyHeader } from 'app/shared/model/surveystore/survey-header.model';

export interface ISection {
  id?: number;
  stt?: number;
  title?: string;
  comment?: any;
  header?: ISurveyHeader;
}

export class Section implements ISection {
  constructor(public id?: number, public stt?: number, public title?: string, public comment?: any, public header?: ISurveyHeader) {}
}
