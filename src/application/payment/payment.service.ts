import { OrderStatus } from 'src/domain/enums/order';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepository } from 'src/domain/repositories/order.repository';
import { PaymentRequestDto } from './dto/paymentRequest.dto';
import { PaymentRepository } from 'src/domain/repositories/payment.repository';
import { PaymentStatus } from 'src/domain/enums/payment.enum';
import { PaymentGateway } from 'src/infra/database/paymentGateway/payment.gateway';
import { Payment } from 'src/domain/entities/payment.entity';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticatedInterface } from '../authentication/interfaces/authenticated.interface';
import { TypeUser } from 'src/domain/enums/user.enum';

@Injectable()
export class PaymentService {
  private readonly loggerService = new Logger(PaymentService.name);
  constructor(
    private readonly repository: PaymentRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async create(
    dto: PaymentRequestDto,
    user: AuthenticatedInterface,
  ): Promise<Payment> {
    try {
      const order = await this.orderRepository.findById(dto.orderId);

      if (!order) {
        throw new NotFoundException('O pedido informado não existe!');
      }

      if (user.profile === TypeUser.CLIENTE && order.customerId !== user.id) {
        throw new ForbiddenException(
          'Você não tem permissão para realizar o pagamento desse pedido.',
        );
      }

      const paymentAvailable =
        order.status === OrderStatus.AGUARDANDO_PAGAMENTO;

      if (!paymentAvailable) {
        throw new ForbiddenException(
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

      this.loggerService.log(
        `PAGAMENTO PROCESSADO | Pagamento ID ${createdPayment.id} | Pedido ID: ${order.id} | Status do pagamento: ${createdPayment.status} | Status do pedido: ${order.status} | Realizado por: ${user.id}`,
      );

      return createdPayment;
    } catch (error) {
      this.loggerService.error('Erro:', error);
      throw error;
    }
  }

  async findById(id: number): Promise<Payment> {
    try {
      const payment = await this.repository.findById(id);

      if (!payment) {
        throw new NotFoundException('Pagamento não encontrado');
      }

      return payment;
    } catch (error) {
      this.loggerService.error('Erro:', error);
      throw error;
    }
  }

  async findAll(): Promise<Payment[]> {
    try {
      const payments = await this.repository.findAll();

      return payments.map((payment) => payment);
    } catch (error) {
      this.loggerService.error('Erro:', error);
      throw error;
    }
  }
}
