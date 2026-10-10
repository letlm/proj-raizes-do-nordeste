import { Prisma } from 'generated/prisma/client';
import { OrderItem } from 'src/domain/entities/orderItem.entity';
type OrderItemRegister = Prisma.OrderItemGetPayload<{}>;

export class OrderItemPrismaMapper {
  static toDomain(register: OrderItemRegister): OrderItem {
    return new OrderItem(
      {
        orderId: register.orderId,
        productId: register.productId,
        quantity: register.quantity,
        unitPrice: register.unitPrice.toNumber(),
      },
      register.id,
    );
  }

  static toSave(items: OrderItem) {
    return {
      orderId: items.orderId,
      productId: items.productId,
      quantity: items.quantity,
      unitPrice: items.unitPrice,
    };
  }
}
