import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PaymentRepository } from 'src/domain/repositories/payment.repository';
import { Payment } from 'src/domain/entities/payment.entity';
import { PaymentPrismaMapper } from '../mappers/paymentPrisma.mapper';
import { PaymentStatus } from 'src/domain/enums/payment.enum';
@Injectable()
export class PaymentPrismaRepository extends PaymentRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(newPayment: Payment): Promise<Payment> {
    const payment = await this.prisma.payment.create({
      data: PaymentPrismaMapper.toSave(newPayment),
    });

    return PaymentPrismaMapper.toDomain(payment);
  }

  async findById(id: number): Promise<Payment | null> {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });

    return payment ? PaymentPrismaMapper.toDomain(payment) : null;
  }

  async findByOrderIdAndStatus(
    orderId: number,
    status: PaymentStatus,
  ): Promise<Payment | null> {
    const payment = await this.prisma.payment.findFirst({
      where: { orderId: orderId, status: status },
    });

    return payment ? PaymentPrismaMapper.toDomain(payment) : null;
  }

  async findAll(): Promise<Payment[]> {
    const payments = await this.prisma.payment.findMany();

    return payments.map(PaymentPrismaMapper.toDomain);
  }

  async update(paymentUpdate: Payment): Promise<Payment> {
    const payment = await this.prisma.payment.update({
      where: {
        id: paymentUpdate.id,
      },
      data: PaymentPrismaMapper.toSave(paymentUpdate),
    });

    return PaymentPrismaMapper.toDomain(payment);
  }
}
