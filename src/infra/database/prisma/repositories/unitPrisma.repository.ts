import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UnitRepository } from 'src/domain/repositories/unit.repository';
import { Unit } from 'src/domain/entities/unit.entity';
import { UnitPrismaMapper } from '../mappers/unitPrisma.mapper';

@Injectable()
export class UnitPrismaRepository extends UnitRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(newUnit: Unit): Promise<Unit> {
    const unit = await this.prisma.unit.create({
      data: UnitPrismaMapper.toSave(newUnit),
    });

    return UnitPrismaMapper.toDomain(unit);
  }

  async findById(id: number): Promise<Unit | null> {
    const unidade = await this.prisma.unit.findUnique({
      where: { id },
    });

    return unidade ? UnitPrismaMapper.toDomain(unidade) : null;
  }

  async findAll(): Promise<Unit[]> {
    const unidades = await this.prisma.unit.findMany();

    return unidades.map(UnitPrismaMapper.toDomain);
  }

  async update(unitUpdate: Unit): Promise<Unit> {
    const unit = await this.prisma.unit.update({
      where: {
        id: unitUpdate.id,
      },
      data: UnitPrismaMapper.toSave(unitUpdate),
    });

    return UnitPrismaMapper.toDomain(unit);
  }
}
