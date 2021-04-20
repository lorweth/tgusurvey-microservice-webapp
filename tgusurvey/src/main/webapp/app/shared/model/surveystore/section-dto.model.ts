import { IQuestionDTO } from './question-dto.model';

export interface ISectionDTO {
  id?: number;
  stt?: number;
  title?: string;
  questions?: IQuestionDTO[];
}

export class SectionDTO implements ISectionDTO {
  constructor(public id?: number, public stt?: number, public title?: string, public questions?: IQuestionDTO[]) {}
}
