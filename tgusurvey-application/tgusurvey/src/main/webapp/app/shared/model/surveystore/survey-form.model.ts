import { IEducationProgram } from 'app/shared/model/surveystore/education-program.model';

export interface ISurveyForm {
  id?: number;
  name?: string;
  note?: string;
  program?: IEducationProgram;
}

export class SurveyForm implements ISurveyForm {
  constructor(public id?: number, public name?: string, public note?: string, public program?: IEducationProgram) {}
}
