import { OrderStatus } from 'src/domain/enums/order';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepository } from 'src/domain/repositories/order.repository';
import { PaymentRequestDto } from './dto/paymentRequest.dto';
import { PaymentRepository } from 'src/domain/repositories/payment.repository';
import { PaymentStatus } from 'src/domain/enums/payment.enum';
import { PaymentGateway } from 'src/infra/database/paymentGateway/payment.gateway';
import { Payment } from 'src/domain/entities/payment.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PaymentService {
  constructor(
    private readonly repository: PaymentRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async create(dto: PaymentRequestDto): Promise<Payment> {
    const order = await this.orderRepository.findById(dto.orderId);

    if (!order) {
      throw new NotFoundException('O pedido informado não existe!');
    }

    const paymentAvailable =
      order.status === OrderStatus.AGUARDANDO_PAGAMENTO ||
      order.status === OrderStatus.CONFIRMADO ||
      order.status === OrderStatus.CANCELADO;

    if (!paymentAvailable) {
      throw new BadRequestException(
        'O pedido não se encontra no status elegível para pagamento!',
      );
    }

    const alreadyPaid = await this.repository.findByOrderIdAndStatus(
      dto.orderId,
      PaymentStatus.APROVADO,
    );

    if (alreadyPaid) {
      throw new BadRequestException('O pedido já foi pago!');
    }

    const gateway = new PaymentGateway();

    const teste = gateway.proccessPayment(dto.method, dto.expirationDate);

    const payment = new Payment({
      orderId: dto.orderId,
      status: teste,
      totalValue: order.totalValue,
      method: dto.method,
      uniqueIdentifier: uuidv4(),
    });

    const createdPayment = await this.repository.create(payment);

    if (teste === PaymentStatus.APROVADO) {
      order.status = OrderStatus.CONFIRMADO;

      await this.orderRepository.update(order.id, order);
    }

    return createdPayment;
  }

  async findById(id: number): Promise<Payment> {
    const payment = await this.repository.findById(id);

    if (!payment) {
      throw new NotFoundException('Pagamento não encontrado');
    }

    return payment;
  }

  async findAll(): Promise<Payment[]> {
    const payments = await this.repository.findAll();

    return payments.map((payment) => payment);
  }
}
