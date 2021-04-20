import { ISectionDTO } from './section-dto.model';

export interface ISurveyHeaderDTO {
  id?: number;
  stt?: number;
  title?: string;
  sections?: ISectionDTO[];
}

export class SurveyHeaderDTO implements ISurveyHeaderDTO {
  constructor(public id?: number, public stt?: number, public title?: string, public sections?: ISectionDTO[]) {}
}
