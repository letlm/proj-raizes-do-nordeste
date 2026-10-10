import { Module } from '@nestjs/common';
import { CancellationController } from '../controllers/cancellation.controller';
import { CancellationService } from 'src/application/cancellation/cancellation.service';
import { CancellationRepository } from 'src/domain/repositories/cancellation.repository';
import { CancellationPrismaRepository } from 'src/infra/database/prisma/repositories/cancellationPrisma.repository';
import { OrderPrismaRepository } from 'src/infra/database/prisma/repositories/orderPrisma.repository';
import { OrderRepository } from 'src/domain/repositories/order.repository';
import { OrderItemRepository } from 'src/domain/repositories/orderItem.repository';
import { OrderItemPrismaRepository } from 'src/infra/database/prisma/repositories/orderItemPrisma.repository';
import { UnitStockRepository } from 'src/domain/repositories/unitStock.repository';
import { UnitStockPrismaRepository } from 'src/infra/database/prisma/repositories/unitStockPrisma.repository';

@Module({
  controllers: [CancellationController],

  providers: [
    CancellationService,
    {
      provide: CancellationRepository,
      useClass: CancellationPrismaRepository,
    },
    {
      provide: OrderRepository,
      useClass: OrderPrismaRepository,
    },
    {
      provide: OrderItemRepository,
      useClass: OrderItemPrismaRepository,
    },
    {
      provide: UnitStockRepository,
      useClass: UnitStockPrismaRepository,
    },
  ],
})
export class CancellationModule {}
