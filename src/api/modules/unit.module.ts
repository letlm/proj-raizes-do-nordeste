import { Module } from '@nestjs/common';
import { UnitController } from 'src/api/controllers/unit.controller';
import { UnitService } from 'src/application/unit/unit.service';
import { UnitRepository } from 'src/domain/repositories/unit.repository';
import { UnitPrismaRepository } from 'src/infra/database/prisma/repositories/unitPrisma.repository';

@Module({
  controllers: [UnitController],

  providers: [
    UnitService,
    {
      provide: UnitRepository,
      useClass: UnitPrismaRepository,
    },
  ],
})
export class UnitModule {}
