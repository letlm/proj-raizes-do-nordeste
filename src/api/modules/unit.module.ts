import { Module } from '@nestjs/common';
import { UnitController } from 'src/api/controllers/unit.controller';
import { UnitService } from 'src/application/unit/unit.service';
import { UnitRepository } from 'src/domain/repositories/unit.repository';
import { UnitStockRepository } from 'src/domain/repositories/unitStock.repository';
import { UnitPrismaRepository } from 'src/infra/database/prisma/repositories/unitPrisma.repository';
import { UnitStockPrismaRepository } from 'src/infra/database/prisma/repositories/unitStockPrisma.repository';
import { UnitStockModule } from './unitStock.module';

@Module({
  controllers: [UnitController],
  imports: [UnitStockModule],
  providers: [
    UnitService,
    {
      provide: UnitRepository,
      useClass: UnitPrismaRepository,
    },
  ],
})
export class UnitModule {}
