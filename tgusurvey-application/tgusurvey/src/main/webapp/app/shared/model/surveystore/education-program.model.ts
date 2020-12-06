import { Moment } from 'moment';
import { ISpecialized } from 'app/shared/model/surveystore/specialized.model';

export interface IEducationProgram {
  id?: number;
  msct?: string;
  name?: string;
  year?: Moment;
  specialized?: ISpecialized;
}

export class EducationProgram implements IEducationProgram {
  constructor(public id?: number, public msct?: string, public name?: string, public year?: Moment, public specialized?: ISpecialized) {}
}
