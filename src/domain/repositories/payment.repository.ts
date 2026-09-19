import { Payment } from '../entities/payment.entity';
import { PaymentStatus } from '../enums/payment.enum';

export abstract class PaymentRepository {
  abstract create(order: Payment): Promise<Payment>;

  abstract findById(id: number): Promise<Payment | null>;

  abstract findByOrderIdAndStatus(
    orderId: number,
    status: PaymentStatus,
  ): Promise<Payment | null>;

  abstract findAll(): Promise<Payment[]>;

  abstract update(payment: Payment): Promise<Payment>;
}
