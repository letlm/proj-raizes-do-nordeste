import { Module } from '@nestjs/common';
import { UserController } from 'src/api/controllers/user.controller';
import { UserService } from 'src/application/user/user.service';
import { UnitRepository } from 'src/domain/repositories/unit.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { UnitPrismaRepository } from 'src/infra/database/prisma/repositories/unitPrisma.repository';
import { UserPrismaRepository } from 'src/infra/database/prisma/repositories/userPrisma.repository';

@Module({
  controllers: [UserController],

  providers: [
    UserService,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: UnitRepository,
      useClass: UnitPrismaRepository,
    },
  ],
})
export class UserModule {}
