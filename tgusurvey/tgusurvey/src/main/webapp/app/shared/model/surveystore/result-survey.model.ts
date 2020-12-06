import { Moment } from 'moment';
import { IQuestion } from 'app/shared/model/surveystore/question.model';
import { IUser } from 'app/core/user/user.model';
import { Answer } from 'app/shared/model/enumerations/answer.model';

export interface IResultSurvey {
  id?: number;
  surveyDate?: Moment;
  answer?: Answer;
  question?: IQuestion;
  user?: IUser;
}

export class ResultSurvey implements IResultSurvey {
  constructor(public id?: number, public surveyDate?: Moment, public answer?: Answer, public question?: IQuestion, public user?: IUser) {}
}
