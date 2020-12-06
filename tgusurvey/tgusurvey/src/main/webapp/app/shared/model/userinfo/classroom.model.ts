export interface IClassroom {
  id?: number;
  mslh?: string;
  name?: string;
}

export class Classroom implements IClassroom {
  constructor(public id?: number, public mslh?: string, public name?: string) {}
}
