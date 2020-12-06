export interface IPosition {
  id?: number;
  mscv?: string;
  name?: string;
}

export class Position implements IPosition {
  constructor(public id?: number, public mscv?: string, public name?: string) {}
}
