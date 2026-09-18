import { Order } from '../entities/order.entity';
import { OrderItemCreate } from '../interfaces/orderItemCreate.interface';

export abstract class OrderRepository {
  abstract create(order: Order, items: OrderItemCreate[]): Promise<Order>;

  abstract findById(id: number): Promise<Order | null>;

  abstract findAll(): Promise<Order[]>;

  abstract update(id: number, order: Order): Promise<Order>;
}
