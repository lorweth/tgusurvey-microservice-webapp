import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IClassroom } from 'app/shared/model/userinfo/classroom.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';
import { GraduationStatus } from 'app/shared/model/enumerations/graduation-status.model';

export interface IStudents {
  id?: number;
  mssv?: string;
  birthDay?: Moment;
  gender?: Gender;
  cmnd?: string;
  phoneNumber?: string;
  graduationStatus?: GraduationStatus;
  user?: IUser;
  classroom?: IClassroom;
}

export class Students implements IStudents {
  constructor(
    public id?: number,
    public mssv?: string,
    public birthDay?: Moment,
    public gender?: Gender,
    public cmnd?: string,
    public phoneNumber?: string,
    public graduationStatus?: GraduationStatus,
    public user?: IUser,
    public classroom?: IClassroom
  ) {}
}
