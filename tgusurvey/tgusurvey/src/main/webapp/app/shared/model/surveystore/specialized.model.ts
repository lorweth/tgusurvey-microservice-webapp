export interface ISpecialized {
  id?: number;
  mscn?: string;
  name?: string;
}

export class Specialized implements ISpecialized {
  constructor(public id?: number, public mscn?: string, public name?: string) {}
}
