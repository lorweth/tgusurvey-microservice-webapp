import { IEducationProgram } from 'app/shared/model/surveystore/education-program.model';
import { ISubject } from 'app/shared/model/surveystore/subject.model';
import { Category } from 'app/shared/model/enumerations/category.model';

export interface IProgramItem {
  id?: number;
  category?: Category;
  program?: IEducationProgram;
  subject?: ISubject;
}

export class ProgramItem implements IProgramItem {
  constructor(public id?: number, public category?: Category, public program?: IEducationProgram, public subject?: ISubject) {}
}
