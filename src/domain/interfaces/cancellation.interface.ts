import { OriginCancellation } from './../enums/cancellation.enum';

export interface CancellationInterface {
  orderId: number;
  userId?: number | null;
  origin: OriginCancellation;
  reason: string;
}
