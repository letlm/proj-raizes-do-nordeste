import { OrderItemInterface } from '../interfaces/orderItem.interface';

export class OrderItem {
  public readonly id: number | null;
  public orderId: number;
  public productId: number;
  public quantity: number;
  public unitPrice: number;

  constructor(props: OrderItemInterface, id: number | null = null) {
    this.id = id;
    this.orderId = props.orderId;
    this.productId = props.productId;
    this.quantity = props.quantity;
    this.unitPrice = props.unitPrice;
  }
}
