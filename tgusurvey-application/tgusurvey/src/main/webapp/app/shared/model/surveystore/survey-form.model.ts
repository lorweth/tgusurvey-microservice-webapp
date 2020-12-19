import { Moment } from 'moment';
import { IEducationProgram } from 'app/shared/model/surveystore/education-program.model';

export interface ISurveyForm {
  id?: number;
  name?: string;
  note?: string;
  startDate?: Moment;
  endDate?: Moment;
  program?: IEducationProgram;
}

export class SurveyForm implements ISurveyForm {
  constructor(
    public id?: number,
    public name?: string,
    public note?: string,
    public startDate?: Moment,
    public endDate?: Moment,
    public program?: IEducationProgram
  ) {}
}
