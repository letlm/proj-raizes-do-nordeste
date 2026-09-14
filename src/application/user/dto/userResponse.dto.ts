import { TypeUser } from 'src/domain/enums/user.enum';

export class UserResponseDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  profile: TypeUser;
  active: boolean;
  unitId?: number | null;
}
