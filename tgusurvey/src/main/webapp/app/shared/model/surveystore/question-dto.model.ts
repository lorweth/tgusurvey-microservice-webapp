import { Interface } from 'readline';

export interface IQuestionDTO {
  id?: number;
  content?: string;
}

export class QuestionDTO implements IQuestionDTO {
  constructor(public id?: number, public content?: string) {}
}
