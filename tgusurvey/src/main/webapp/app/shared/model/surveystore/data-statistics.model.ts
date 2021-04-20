export interface IData {
  name?: string;
  value?: number;
}

export class Data implements IData {
  constructor(public name?: string, public value?: number) {}
}
