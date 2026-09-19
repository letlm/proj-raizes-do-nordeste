import { OrderChannel, OrderStatus } from 'src/domain/enums/order';
import { Prisma } from 'generated/prisma/client';
import { Order } from 'src/domain/entities/order.entity';
type OrderRegister = Prisma.OrderGetPayload<{}>;

export class OrderPrismaMapper {
  static toDomain(register: OrderRegister): Order {
    return new Order(
      {
        status: register.status as OrderStatus,
        orderChannel: register.orderChannel as OrderChannel,
        customerId: register.customerId,
        createdById: register.createdById,
        unitId: register.unitId,
        campaignId: register.campaignId,
        totalValue: register.totalValue.toNumber(),
      },
      register.id,
    );
  }

  static toSave(order: Order) {
    return {
      status: order.status,
      orderChannel: order.orderChannel,
      customerId: order.customerId,
      createdById: order.createdById,
      unitId: order.unitId,
      campaignId: order.campaignId,
      totalValue: order.totalValue,
    };
  }
}
