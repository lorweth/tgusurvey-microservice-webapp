import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IPosition } from 'app/shared/model/userinfo/position.model';
import { IUnit } from 'app/shared/model/userinfo/unit.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface ILecturer {
  id?: number;
  msgv?: string;
  birthDay?: Moment;
  address?: any;
  gender?: Gender;
  cmnd?: string;
  phoneNumber?: string;
  user?: IUser;
  position?: IPosition;
  unit?: IUnit;
}

export class Lecturer implements ILecturer {
  constructor(
    public id?: number,
    public msgv?: string,
    public birthDay?: Moment,
    public address?: any,
    public gender?: Gender,
    public cmnd?: string,
    public phoneNumber?: string,
    public user?: IUser,
    public position?: IPosition,
    public unit?: IUnit
  ) {}
}
