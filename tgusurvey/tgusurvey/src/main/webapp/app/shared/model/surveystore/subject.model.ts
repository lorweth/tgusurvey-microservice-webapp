export interface ISubject {
  id?: number;
  msmh?: string;
  name?: string;
  numOfCredit?: number;
  theoryLesson?: number;
  practiceLesson?: number;
}

export class Subject implements ISubject {
  constructor(
    public id?: number,
    public msmh?: string,
    public name?: string,
    public numOfCredit?: number,
    public theoryLesson?: number,
    public practiceLesson?: number
  ) {}
}
