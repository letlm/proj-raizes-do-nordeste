import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OrderRepository } from 'src/domain/repositories/order.repository';
import { Order } from 'src/domain/entities/order.entity';
import { OrderPrismaMapper } from '../mappers/orderPrisma.mapper';
import { OrderItemCreate } from 'src/domain/interfaces/orderItemCreate.interface';
import { OrderChannel } from 'src/domain/enums/order';
@Injectable()
export class OrderPrismaRepository extends OrderRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(newOrder: Order, items: OrderItemCreate[]): Promise<Order> {
    const order = await this.prisma.order.create({
      data: {
        ...OrderPrismaMapper.toSave(newOrder),
        orderItems: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        },
      },
    });

    return OrderPrismaMapper.toDomain(order);
  }

  async findById(id: number): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
    });

    return order ? OrderPrismaMapper.toDomain(order) : null;
  }

  async findAll(canalPedido?: OrderChannel): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: canalPedido
        ? {
            orderChannel: canalPedido,
          }
        : undefined,
    });

    return orders.map(OrderPrismaMapper.toDomain);
  }

  async update(id: number, orderUpdate: Order): Promise<Order> {
    const order = await this.prisma.order.update({
      where: {
        id: id,
      },
      data: OrderPrismaMapper.toSave(orderUpdate),
    });

    return OrderPrismaMapper.toDomain(order);
  }
}
