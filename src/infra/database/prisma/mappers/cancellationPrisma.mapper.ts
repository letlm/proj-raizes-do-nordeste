import { Prisma } from 'generated/prisma/client';
import { Cancellation } from 'src/domain/entities/cancellation.entity';
import { OriginCancellation } from 'src/domain/enums/cancellation.enum';

type CancellationRegister = Prisma.CancellationGetPayload<{}>;

export class CancellationPrismaMapper {
  static toDomain(register: CancellationRegister): Cancellation {
    return new Cancellation(
      {
        orderId: register.orderId,
        userId: register.userId,
        origin: register.origin as OriginCancellation,
        reason: register.reason,
      },
      register.id,
    );
  }

  static toSave(cancellation: Cancellation) {
    return {
      orderId: cancellation.orderId,
      userId: cancellation.userId,
      origin: cancellation.origin,
      reason: cancellation.reason,
    };
  }
}
