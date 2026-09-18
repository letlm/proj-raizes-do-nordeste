import { OrderStatus } from 'src/domain/enums/order';
import { UserRepository } from 'src/domain/repositories/user.repository';
import {
  BadRequestException,
  Injectable,
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
import { OrderChannel } from 'generated/prisma/enums';
import { OrderUpdateDto } from './dto/orderUpdate.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly repository: OrderRepository,
    private readonly userRepository: UserRepository,
    private readonly unitRepository: UnitRepository,
    private readonly productRepository: ProductRepository,
    private readonly unitStockRepository: UnitStockRepository,
  ) {}

  async create(dto: OrderRequestDto): Promise<Order> {
    let total = 0;
    const customer = await this.userRepository.findById(dto.customerId);

    if (!customer) {
      throw new NotFoundException('Cliente não encontrado');
    }

    if (customer.profile !== TypeUser.CLIENTE) {
      throw new BadRequestException('Usuário deve ser um cliente');
    }

    const createdOrderBy = await this.userRepository.findById(dto.createdById);

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
      dto.createdById !== dto.customerId
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
          `Produto de id ${item.productId} não possui cadastro na unidade mencionada`,
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
      createdById: dto.createdById,
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

    return createdOrder;
  }

  async findById(id: number): Promise<Order> {
    const order = await this.repository.findById(id);

    if (!order) {
      throw new NotFoundException('Produto não encontrado');
    }

    return order;
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.repository.findAll();

    return orders.map((order) => order);
  }

  async update(id: number, dto: OrderUpdateDto): Promise<Order> {
    const order = await this.repository.findById(id);

    if (!order) {
      throw new NotFoundException('Pedido não encontrado');
    }

    if (dto.status !== undefined) {
      order.status = dto.status;
    }

    if (dto.orderChannel !== undefined) {
      order.orderChannel = dto.orderChannel;
    }

    if (dto.customerId !== undefined) {
      order.customerId = dto.customerId;
    }

    if (dto.createdById !== undefined) {
      order.createdById = dto.createdById;
    }

    if (dto.customerId !== undefined) {
      order.customerId = dto.customerId;
    }

    if (dto.unitId !== undefined) {
      order.unitId = dto.unitId;
    }

    if (dto.campaignId !== undefined) {
      order.campaignId = dto.campaignId;
    }

    if (dto.totalValue !== undefined) {
      order.totalValue = dto.totalValue;
    }
    return await this.repository.update(id, order);
  }
}
