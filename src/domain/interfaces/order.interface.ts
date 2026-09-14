import { OrderChannel, TypeStatus } from '../enums/order';

export interface OrderInterface {
  status: TypeStatus;
  orderChannel: OrderChannel;
  customerId: number;
  createdById: number;
  unitId: number;
  campaignId?: number | null;
  totalValue: number;
}
