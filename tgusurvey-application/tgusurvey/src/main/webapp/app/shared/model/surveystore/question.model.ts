import { ISection } from 'app/shared/model/surveystore/section.model';

export interface IQuestion {
  id?: number;
  content?: string;
  section?: ISection;
}

export class Question implements IQuestion {
  constructor(public id?: number, public content?: string, public section?: ISection) {}
}
