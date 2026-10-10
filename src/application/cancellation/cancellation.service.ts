import { OrderStatus } from 'src/domain/enums/order';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepository } from 'src/domain/repositories/order.repository';
import { Cancellation } from 'src/domain/entities/cancellation.entity';
import { CancelRequestDto } from './dto/CancelRequest.dto';
import { CancellationRepository } from 'src/domain/repositories/cancellation.repository';
import { AuthenticatedInterface } from '../authentication/interfaces/authenticated.interface';
import { TypeUser } from 'src/domain/enums/user.enum';
import { OriginCancellation } from 'src/domain/enums/cancellation.enum';
import { OrderItemRepository } from 'src/domain/repositories/orderItem.repository';
import { UnitStockRepository } from 'src/domain/repositories/unitStock.repository';

@Injectable()
export class CancellationService {
  private readonly loggerService = new Logger(CancellationService.name);
  constructor(
    private readonly repository: CancellationRepository,
    private readonly orderRepository: OrderRepository,
    private readonly orderItemRepository: OrderItemRepository,
    private readonly unitStockRepository: UnitStockRepository,
  ) {}

  async create(
    dto: CancelRequestDto,
    user: AuthenticatedInterface,
  ): Promise<Cancellation> {
    try {
      const order = await this.orderRepository.findById(dto.orderId);

      if (!order) {
        throw new NotFoundException('O pedido informado não existe!');
      }

      const alreadyCancel = order.status === OrderStatus.CANCELADO;

      if (alreadyCancel) {
        throw new BadRequestException('O pedido já foi cancelado!');
      }

      const cancellAvailable =
        order.status === OrderStatus.AGUARDANDO_PAGAMENTO ||
        order.status === OrderStatus.CONFIRMADO;

      if (!cancellAvailable) {
        throw new BadRequestException(
          'O pedido não se encontra no status elegível para cancelamento!',
        );
      }

      const userIsClient = user.profile === TypeUser.CLIENTE;
      if (userIsClient && user.id !== order.customerId) {
        throw new ForbiddenException('Você não pode cancelar esse pedido!');
      }

      let origin = OriginCancellation.ESTABELECIMENTO;

      if (user.profile === TypeUser.CLIENTE) {
        origin = OriginCancellation.CLIENTE;
      }

      const cancellation = new Cancellation({
        orderId: dto.orderId,
        userId: user.id,
        origin: origin,
        reason: dto.reason,
      });

      const cancelCreated = await this.repository.create(cancellation);

      order.status = OrderStatus.CANCELADO;
      await this.orderRepository.update(order.id, order);

      const orderItems = await this.orderItemRepository.findByOrderId(order.id);

      for (const item of orderItems) {
        const unitStock = await this.unitStockRepository.findByProductAndUnit(
          item.productId,
          order.unitId,
        );

        if (!unitStock) {
          throw new NotFoundException(
            'Não foi encontrado um estoque para esse produto!',
          );
        }

        await this.unitStockRepository.updateQuantityUnitStockByIdAfterCancel(
          unitStock.id,
          item.quantity,
        );
      }

      this.loggerService.log(
        `CANCELAMENTO REALIZADO | Cancelamento ID ${cancelCreated.id} | Pedido ID: ${order.id} | Origem: ${cancelCreated.origin} | Status do pedido: ${order.status} | Realizado por: ${user.id}`,
      );

      return cancelCreated;
    } catch (error) {
      this.loggerService.error('Erro:', error);
      throw error;
    }
  }

  async findById(id: number): Promise<Cancellation> {
    try {
      const cancel = await this.repository.findById(id);

      if (!cancel) {
        throw new NotFoundException('Cancelamento não encontrado');
      }

      return cancel;
    } catch (error) {
      this.loggerService.error('Erro:', error);
      throw error;
    }
  }

  async findAll(): Promise<Cancellation[]> {
    try {
      const cancels = await this.repository.findAll();

      return cancels.map((cancel) => cancel);
    } catch (error) {
      this.loggerService.error('Erro:', error);
      throw error;
    }
  }
}
