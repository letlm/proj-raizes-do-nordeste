import { Module } from '@nestjs/common';
import { OrderController } from 'src/api/controllers/order.controller';
import { OrderService } from 'src/application/order/order.service';
import { OrderRepository } from 'src/domain/repositories/order.repository';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { UnitRepository } from 'src/domain/repositories/unit.repository';
import { UnitStockRepository } from 'src/domain/repositories/unitStock.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { OrderPrismaRepository } from 'src/infra/database/prisma/repositories/orderPrisma.repository';
import { ProductPrismaRepository } from 'src/infra/database/prisma/repositories/productPrisma.repository';
import { UnitPrismaRepository } from 'src/infra/database/prisma/repositories/unitPrisma.repository';
import { UnitStockPrismaRepository } from 'src/infra/database/prisma/repositories/unitStockPrisma.repository';
import { UserPrismaRepository } from 'src/infra/database/prisma/repositories/userPrisma.repository';

@Module({
  controllers: [OrderController],

  providers: [
    OrderService,
    {
      provide: OrderRepository,
      useClass: OrderPrismaRepository,
    },
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
    {
      provide: UnitRepository,
      useClass: UnitPrismaRepository,
    },
    {
      provide: ProductRepository,
      useClass: ProductPrismaRepository,
    },
    {
      provide: UnitStockRepository,
      useClass: UnitStockPrismaRepository,
    },
  ],
})
export class OrderModule {}
