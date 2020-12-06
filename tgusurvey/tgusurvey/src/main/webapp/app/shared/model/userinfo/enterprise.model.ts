import { IUser } from 'app/core/user/user.model';

export interface IEnterprise {
  id?: number;
  name?: string;
  address?: string;
  phoneNumber?: string;
  representative?: string;
  lineOfBussiness?: string;
  user?: IUser;
}

export class Enterprise implements IEnterprise {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public phoneNumber?: string,
    public representative?: string,
    public lineOfBussiness?: string,
    public user?: IUser
  ) {}
}
