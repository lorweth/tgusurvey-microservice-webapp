import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IQuestion } from 'app/shared/model/surveystore/question.model';
import { Answer } from 'app/shared/model/enumerations/answer.model';

export interface IResultSurvey {
  id?: number;
  answer?: Answer;
  comment?: string;
  date?: Moment;
  user?: IUser;
  question?: IQuestion;
}

export class ResultSurvey implements IResultSurvey {
  constructor(
    public id?: number,
    public answer?: Answer,
    public comment?: string,
    public date?: Moment,
    public user?: IUser,
    public question?: IQuestion
  ) {}
}
