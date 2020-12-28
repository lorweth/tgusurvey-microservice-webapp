export interface IAnswerCount {
  answer?: string;
  count?: number;
}

export class AnswerCount implements IAnswerCount {
  constructor(public answer?: string, public count?: number) {}
}
