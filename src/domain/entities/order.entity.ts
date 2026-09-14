import { OrderChannel } from '../enums/order';
import { TypeStatus } from '../enums/order';
import { OrderInterface } from '../interfaces/order.interface';

export class Order {
  public readonly id: number | null;
  public status: TypeStatus;
  public orderChannel: OrderChannel;
  public customerId: number;
  public createdById: number;
  public unitId: number;
  public campaignId?: number;
  public totalValue: number;

  constructor(props: OrderInterface, id: number | null = null) {
    this.id = id;
    this.status = props.status;
    this.orderChannel = props.orderChannel;
    this.customerId = props.customerId;
    this.createdById = props.createdById;
    this.unitId = props.unitId;
    this.campaignId = props.campaignId;
    this.totalValue = props.totalValue;
  }
}
