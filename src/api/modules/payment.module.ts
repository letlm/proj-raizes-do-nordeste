import { Module } from '@nestjs/common';
import { PaymentService } from 'src/application/payment/payment.service';
import { OrderRepository } from 'src/domain/repositories/order.repository';
import { OrderPrismaRepository } from 'src/infra/database/prisma/repositories/orderPrisma.repository';
import { PaymentController } from '../controllers/payment.controller';
import { PaymentPrismaRepository } from 'src/infra/database/prisma/repositories/paymentPrisma.repository';
import { PaymentRepository } from 'src/domain/repositories/payment.repository';

@Module({
  controllers: [PaymentController],

  providers: [
    PaymentService,
    {
      provide: PaymentRepository,
      useClass: PaymentPrismaRepository,
    },
    {
      provide: OrderRepository,
      useClass: OrderPrismaRepository,
    },
  ],
})
export class PaymentModule {}
