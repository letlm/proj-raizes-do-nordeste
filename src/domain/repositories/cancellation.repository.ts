import { Cancellation } from '../entities/cancellation.entity';

export abstract class CancellationRepository {
  abstract create(cancel: Cancellation): Promise<Cancellation>;

  abstract findById(id: number): Promise<Cancellation | null>;

  abstract findAll(): Promise<Cancellation[]>;

  abstract update(id: number, cancel: Cancellation): Promise<Cancellation>;
}
