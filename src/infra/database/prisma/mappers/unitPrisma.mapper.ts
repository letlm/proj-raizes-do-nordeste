import { Prisma } from 'generated/prisma/client';
import { Unit } from 'src/domain/entities/unit.entity';
type UnitRegister = Prisma.UnitGetPayload<{}>;

export class UnitPrismaMapper {
  static toDomain(register: UnitRegister): Unit {
    return new Unit(
      {
        name: register.name,
        phone: register.phone,
        city: register.city,
        street: register.street,
        zipCode: register.zipCode,
        active: register.active,
        number: register.number,
        state: register.state,
      },
      register.id,
    );
  }

  static toSave(unit: Unit) {
    return {
      name: unit.name,
      phone: unit.phone,
      city: unit.city,
      street: unit.street,
      zipCode: unit.zipCode,
      active: unit.active,
      number: unit.number,
      state: unit.state,
    };
  }
}
