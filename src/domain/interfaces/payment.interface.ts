import { PaymentMethod, PaymentStatus } from '../enums/payment.enum';

export interface PaymentInterface {
  orderId: number;
  status: PaymentStatus;
  totalValue: number;
  method: PaymentMethod;
  uniqueIdentifier: string;
}
