import { UnitStock } from '../entities/unitStock.entity';

export abstract class UnitStockRepository {
  abstract create(unitStock: UnitStock): Promise<UnitStock>;

  abstract findById(id: number): Promise<UnitStock | null>;

  abstract findAll(): Promise<UnitStock[]>;

  abstract update(unitStock: UnitStock): Promise<UnitStock>;

  abstract findByProductAndUnit(
    productId: number,
    unitId: number,
  ): Promise<UnitStock | null>;

  abstract updateQuantityUnitStockById(
    id: number,
    quantity: number,
  ): Promise<void>;
}
