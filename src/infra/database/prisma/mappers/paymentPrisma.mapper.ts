import { Prisma } from 'generated/prisma/client';
import { PaymentStatus, PaymentMethod } from 'src/domain/enums/payment.enum';
import { Payment } from 'src/domain/entities/payment.entity';
type PaymentRegister = Prisma.PaymentGetPayload<{}>;

export class PaymentPrismaMapper {
  static toDomain(register: PaymentRegister): Payment {
    return new Payment(
      {
        orderId: register.orderId,
        status: register.status as PaymentStatus,
        totalValue: register.totalValue.toNumber(),
        method: register.method as PaymentMethod,
        uniqueIdentifier: register.uniqueIdentifier,
      },
      register.id,
    );
  }

  static toSave(payment: Payment) {
    return {
      orderId: payment.orderId,
      status: payment.status,
      totalValue: payment.totalValue,
      method: payment.method,
      uniqueIdentifier: payment.uniqueIdentifier,
    };
  }
}
