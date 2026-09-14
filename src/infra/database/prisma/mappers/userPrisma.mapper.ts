import { Prisma, UserType } from 'generated/prisma/client';
import { User } from 'src/domain/entities/user.entity';
import { TypeUser } from 'src/domain/enums/user.enum';

type UserRegister = Prisma.UserGetPayload<{}>;

export class UserPrismaMapper {
  static toDomain(register: UserRegister): User {
    return new User(
      {
        name: register.name,
        phone: register.phone,
        email: register.email,
        passHash: register.passwordHash,
        profile: register.profile as TypeUser,
        active: register.active,
        unitId: register.unitId,
      },
      register.id,
    );
  }

  static toSave(user: User) {
    return {
      name: user.name,
      email: user.email,
      phone: user.phone,
      passwordHash: user.passHash,
      profile: user.profile as UserType,
      active: user.active,
      unitId: user.unitId,
    };
  }
}
