import { OrderChannel, OrderStatus } from 'src/domain/enums/order';
import { UserRepository } from 'src/domain/repositories/user.repository';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepository } from 'src/domain/repositories/order.repository';
import { OrderRequestDto } from './dto/orderRequest.dto';
import { UnitRepository } from 'src/domain/repositories/unit.repository';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { UnitStockRepository } from 'src/domain/repositories/unitStock.repository';
import { Order } from 'src/domain/entities/order.entity';
import { TypeUser } from 'src/domain/enums/user.enum';
import { OrderItemCreate } from 'src/domain/interfaces/orderItemCreate.interface';
import { StockUpdate } from 'src/domain/interfaces/stockUpdate.interface';
import { OrderUpdateDto } from './dto/orderUpdate.dto';
import { AuthenticatedInterface } from '../authentication/interfaces/authenticated.interface';

@Injectable()
export class OrderService {
  private readonly loggerService = new Logger(OrderService.name);
  constructor(
    private readonly repository: OrderRepository,
    private readonly userRepository: UserRepository,
    private readonly unitRepository: UnitRepository,
    private readonly productRepository: ProductRepository,
    private readonly unitStockRepository: UnitStockRepository,
  ) {}

  async create(
    dto: OrderRequestDto,
    user: AuthenticatedInterface,
  ): Promise<Order> {
    try {
      let total = 0;
      const customer = await this.userRepository.findById(dto.customerId);

      if (!customer) {
        throw new NotFoundException('Cliente não encontrado');
      }

      if (customer.profile !== TypeUser.CLIENTE) {
        throw new BadRequestException('Usuário deve ser um cliente');
      }

      const createdOrderBy = await this.userRepository.findById(user.id);

      if (!createdOrderBy) {
        throw new NotFoundException('Usuário não encontrado');
      }

      if (
        dto.orderChannel === OrderChannel.BALCAO &&
        createdOrderBy.profile !== TypeUser.ATENDENTE
      ) {
        throw new BadRequestException(
          'Pedidos no balcão devem ser criados por um atendente',
        );
      }

      if (
        dto.orderChannel !== OrderChannel.BALCAO &&
        user.id !== dto.customerId
      ) {
        throw new BadRequestException(
          'O pedido deve ser criado pelo próprio cliente',
        );
      }

      const unit = await this.unitRepository.findById(dto.unitId);

      if (!unit) {
        throw new NotFoundException('Unidade não encontrada');
      }

      const items: OrderItemCreate[] = [];
      const stock: StockUpdate[] = [];
      for (const item of dto.items) {
        const product = await this.productRepository.findById(item.productId);

        if (!product) {
          throw new NotFoundException(
            `Produto de id ${item.productId} não encontrado`,
          );
        }

        if (!product.active) {
          throw new BadRequestException(
            `Produto de id ${item.productId} não está disponível`,
          );
        }

        const unitStock = await this.unitStockRepository.findByProductAndUnit(
          item.productId,
          dto.unitId,
        );

        if (!unitStock) {
          throw new NotFoundException(
            `Produto de id ${item.productId} não possui cadastro na unidade`,
          );
        }

        if (item.quantity > unitStock.quantity) {
          throw new BadRequestException(
            `Estoque não disponível para o produto de id ${item.productId}`,
          );
        }

        if (!unitStock.available) {
          throw new BadRequestException(
            `Produto de id ${item.productId} não está disponível`,
          );
        }

        const subtotal = item.quantity * product.price;

        total += subtotal;

        items.push({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: product.price,
        });

        stock.push({
          unitStockId: unitStock.id!,
          quantity: item.quantity,
        });
      }

      const order = new Order({
        status: OrderStatus.AGUARDANDO_PAGAMENTO,
        orderChannel: dto.orderChannel,
        customerId: dto.customerId,
        createdById: user.id,
        unitId: dto.unitId,
        campaignId: dto.campaignId,
        totalValue: total,
      });

      const createdOrder = await this.repository.create(order, items);

      for (const item of stock) {
        await this.unitStockRepository.updateQuantityUnitStockById(
          item.unitStockId,
          item.quantity,
        );
      }
      this.loggerService.log(
        `PEDIDO CRIADO | Pedido ID ${createdOrder.id} | Criado por: ${createdOrder.createdById} | Cliente de ID ${customer.id}`,
      );
      return createdOrder;
    } catch (error) {
      this.loggerService.error('Erro:', error);
      throw error;
    }
  }

  async findById(id: number): Promise<Order> {
    try {
      const order = await this.repository.findById(id);

      if (!order) {
        throw new NotFoundException('Pedido não encontrado');
      }

      return order;
    } catch (error) {
      this.loggerService.error('Erro:', error);
      throw error;
    }
  }

  async findAll(canalPedido?: OrderChannel): Promise<Order[]> {
    try {
      const orders = await this.repository.findAll(canalPedido);

      return orders.map((order) => order);
    } catch (error) {
      this.loggerService.error('Erro:', error);
      throw error;
    }
  }

  async update(
    id: number,
    dto: OrderUpdateDto,
    user: AuthenticatedInterface,
  ): Promise<Order> {
    try {
      const allowedTransitions: Record<OrderStatus, OrderStatus | null> = {
        [OrderStatus.AGUARDANDO_PAGAMENTO]: null,
        [OrderStatus.CONFIRMADO]: OrderStatus.EM_PREPARO,
        [OrderStatus.EM_PREPARO]: OrderStatus.PRONTO,
        [OrderStatus.PRONTO]: OrderStatus.ENTREGUE,
        [OrderStatus.ENTREGUE]: null,
        [OrderStatus.CANCELADO]: null,
      };

      const requiredProfile: Partial<Record<OrderStatus, TypeUser>> = {
        [OrderStatus.EM_PREPARO]: TypeUser.COZINHA,
        [OrderStatus.PRONTO]: TypeUser.COZINHA,
        [OrderStatus.ENTREGUE]: TypeUser.ATENDENTE,
      };

      const order = await this.repository.findById(id);

      if (!order) {
        throw new NotFoundException('Pedido não encontrado');
      }

      const statusOrderOld = order.status;

      if (dto.status !== undefined) {
        const status = dto.status;
        const allowedStatus = allowedTransitions[order.status];

        if (allowedStatus !== status) {
          throw new BadRequestException(
            'Não é possível fazer essa alteração por este método.',
          );
        }

        const profileRequired = requiredProfile[status];
        if (profileRequired && user.profile !== profileRequired) {
          throw new ForbiddenException(
            'Este usuário não pode fazer essa alteração.',
          );
        }

        order.status = status;
      }

      const updatedOrder = await this.repository.update(id, order);
      this.loggerService.log(
        `PEDIDO ATUALIZADO | Pedido ID ${order.id} | Pedido atualizado por: ${user.id} | Status anterior: ${statusOrderOld} | Status atualizado: ${order.status}`,
      );
      return updatedOrder;
    } catch (error) {
      this.loggerService.error('Erro:', error);
      throw error;
    }
  }
}
