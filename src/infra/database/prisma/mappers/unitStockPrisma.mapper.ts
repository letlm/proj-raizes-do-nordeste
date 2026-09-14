import { Prisma } from 'generated/prisma/client';
import { UnitStock } from 'src/domain/entities/unitStock.entity';
type UnitStockRegister = Prisma.UnitStockGetPayload<{}>;

export class UnitStockPrismaMapper {
  static toDomain(register: UnitStockRegister): UnitStock {
    return new UnitStock(
      {
        quantity: register.quantity,
        available: register.available,
        productId: register.productId,
        unitId: register.unitId,
      },
      register.id,
    );
  }

  static toSave(unitStock: UnitStock) {
    return {
      quantity: unitStock.quantity,
      available: unitStock.available,
      productId: unitStock.productId,
      unitId: unitStock.unitId,
    };
  }
}
