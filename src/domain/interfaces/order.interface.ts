import { OrderChannel, OrderStatus } from '../enums/order';

export interface OrderInterface {
  status: OrderStatus;
  orderChannel: OrderChannel;
  customerId: number;
  createdById: number;
  unitId: number;
  campaignId?: number | null;
  totalValue: number;
}
