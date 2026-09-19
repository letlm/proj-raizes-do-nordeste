import { PaymentMethod, PaymentStatus } from '../enums/payment.enum';
import { PaymentInterface } from '../interfaces/payment.interface';

export class Payment {
  public readonly id: number | null;
  public orderId: number;
  public status: PaymentStatus;
  public totalValue: number;
  public method: PaymentMethod;
  public uniqueIdentifier: string;

  constructor(props: PaymentInterface, id: number | null = null) {
    this.id = id;
    this.orderId = props.orderId;
    this.status = props.status;
    this.totalValue = props.totalValue;
    this.method = props.method;
    this.uniqueIdentifier = props.uniqueIdentifier;
  }
}
