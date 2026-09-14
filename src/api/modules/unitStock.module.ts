import { Module } from '@nestjs/common';
import { UnitStockController } from '../controllers/unitStock.controller';
import { UnitStockService } from 'src/application/unitStock/unitStock.service';
import { UnitStockRepository } from 'src/domain/repositories/unitStock.repository';
import { UnitStockPrismaRepository } from 'src/infra/database/prisma/repositories/unitStockPrisma.repository';
import { ProductPrismaRepository } from 'src/infra/database/prisma/repositories/productPrisma.repository';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { UnitRepository } from 'src/domain/repositories/unit.repository';
import { UnitPrismaRepository } from 'src/infra/database/prisma/repositories/unitPrisma.repository';

@Module({
  controllers: [UnitStockController],

  providers: [
    UnitStockService,
    {
      provide: UnitStockRepository,
      useClass: UnitStockPrismaRepository,
    },
    {
      provide: ProductRepository,
      useClass: ProductPrismaRepository,
    },
    {
      provide: UnitRepository,
      useClass: UnitPrismaRepository,
    },
  ],
})
export class UnitStockModule {}
