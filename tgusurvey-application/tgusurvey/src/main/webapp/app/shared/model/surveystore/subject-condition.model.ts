import { ISubject } from 'app/shared/model/surveystore/subject.model';
import { Constraint } from 'app/shared/model/enumerations/constraint.model';

export interface ISubjectCondition {
  id?: number;
  constraint?: Constraint;
  subject?: ISubject;
  beforeSubject?: ISubject;
}

export class SubjectCondition implements ISubjectCondition {
  constructor(public id?: number, public constraint?: Constraint, public subject?: ISubject, public beforeSubject?: ISubject) {}
}
