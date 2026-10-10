import { OriginCancellation } from '../enums/cancellation.enum';
import { CancellationInterface } from '../interfaces/cancellation.interface';

export class Cancellation {
  public readonly id: number | null;
  public orderId: number;
  public userId?: number | null;
  public origin: OriginCancellation;
  public reason: string;

  constructor(props: CancellationInterface, id: number | null = null) {
    this.id = id;
    this.orderId = props.orderId;
    this.userId = props.userId;
    this.origin = props.origin;
    this.reason = props.reason;
  }
}
