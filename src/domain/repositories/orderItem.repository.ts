import { OrderItem } from '../entities/orderItem.entity';
import { OrderItemInterface } from '../interfaces/orderItem.interface';

export abstract class OrderItemRepository {
  abstract create(items: OrderItemInterface): Promise<OrderItem>;

  abstract findById(id: number): Promise<OrderItem>;

  abstract findByOrderId(orderId: number): Promise<OrderItem[]>;

  abstract findAll(): Promise<OrderItem[]>;

  abstract update(id: number, order: OrderItem): Promise<OrderItem>;
}
