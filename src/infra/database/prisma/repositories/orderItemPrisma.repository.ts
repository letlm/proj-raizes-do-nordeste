import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OrderItemRepository } from 'src/domain/repositories/orderItem.repository';
import { OrderItem } from 'src/domain/entities/orderItem.entity';
import { OrderItemPrismaMapper } from '../mappers/orderItemPrisma.mapper';
@Injectable()
export class OrderItemPrismaRepository extends OrderItemRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(newOrderItems: OrderItem): Promise<OrderItem> {
    const orderItem = await this.prisma.orderItem.create({
      data: OrderItemPrismaMapper.toSave(newOrderItems),
    });

    return OrderItemPrismaMapper.toDomain(orderItem);
  }

  async findById(id: number): Promise<OrderItem | null> {
    const orderItem = await this.prisma.orderItem.findUnique({
      where: { id },
    });

    return orderItem ? OrderItemPrismaMapper.toDomain(orderItem) : null;
  }

  async findByOrderId(id: number): Promise<OrderItem[]> {
    const orderItems = await this.prisma.orderItem.findMany({
      where: { orderId: id },
    });

    return orderItems.map(OrderItemPrismaMapper.toDomain);
  }

  async findAll(): Promise<OrderItem[]> {
    const orderItems = await this.prisma.orderItem.findMany();

    return orderItems.map(OrderItemPrismaMapper.toDomain);
  }

  async update(id: number, orderUpdate: OrderItem): Promise<OrderItem> {
    const orderItem = await this.prisma.orderItem.update({
      where: {
        id: id,
      },
      data: OrderItemPrismaMapper.toSave(orderUpdate),
    });

    return OrderItemPrismaMapper.toDomain(orderItem);
  }
}
