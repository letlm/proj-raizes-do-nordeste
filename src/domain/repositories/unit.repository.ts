import { Unit } from '../entities/unit.entity';

export abstract class UnitRepository {
  abstract create(unidade: Unit): Promise<Unit>;

  abstract findById(id: number): Promise<Unit | null>;

  abstract findAll(): Promise<Unit[]>;

  abstract update(unidade: Unit): Promise<Unit>;
}
