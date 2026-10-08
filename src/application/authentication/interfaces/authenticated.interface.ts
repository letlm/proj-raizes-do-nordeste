import { TypeUser } from 'src/domain/enums/user.enum';

export interface AuthenticatedInterface {
  id: number;
  profile: TypeUser;
}
