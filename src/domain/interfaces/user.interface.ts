import { TypeUser } from '../enums/user.enum';

export interface UserInterface {
  name: string;
  email: string;
  phone: string;
  profile: TypeUser;
  passHash: string;
  active?: boolean;
  unitId?: number | null;
}
