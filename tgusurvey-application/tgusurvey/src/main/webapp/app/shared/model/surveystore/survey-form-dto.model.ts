import { Moment } from 'moment';
import { ISurveyHeaderDTO } from './header-dto.model';

export interface ISurveyFormDTO {
  id?: number;
  name?: string;
  note?: string;
  startDate?: Moment;
  endDate?: Moment;
  headers?: ISurveyHeaderDTO[];
}

export class SurveyFormDTO implements ISurveyFormDTO {
  constructor(
    public id?: number,
    public name?: string,
    public note?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public headers?: ISurveyHeaderDTO[]
  ) {}
}
