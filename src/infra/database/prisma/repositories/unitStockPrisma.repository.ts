import { Injectable } from '@nestjs/common';
import { UnitStockRepository } from 'src/domain/repositories/unitStock.repository';
import { PrismaService } from '../prisma.service';
import { UnitStock } from 'src/domain/entities/unitStock.entity';
import { UnitStockPrismaMapper } from '../mappers/unitStockPrisma.mapper';

@Injectable()
export class UnitStockPrismaRepository extends UnitStockRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(newUnitStock: UnitStock): Promise<UnitStock> {
    const unitStock = await this.prisma.unitStock.create({
      data: UnitStockPrismaMapper.toSave(newUnitStock),
    });

    return UnitStockPrismaMapper.toDomain(unitStock);
  }

  async findById(id: number): Promise<UnitStock | null> {
    const unitStock = await this.prisma.unitStock.findUnique({
      where: { id },
    });

    return unitStock ? UnitStockPrismaMapper.toDomain(unitStock) : null;
  }

  async findByProductAndUnit(
    productId: number,
    unitId: number,
  ): Promise<UnitStock | null> {
    const unitStock = await this.prisma.unitStock.findUnique({
      where: {
        unitId_productId: { unitId: unitId, productId: productId },
      },
    });

    return unitStock ? UnitStockPrismaMapper.toDomain(unitStock) : null;
  }

  async findAll(): Promise<UnitStock[]> {
    const unitStocks = await this.prisma.unitStock.findMany();

    return unitStocks.map(UnitStockPrismaMapper.toDomain);
  }

  async update(unitStockUpdate: UnitStock): Promise<UnitStock> {
    const unitStock = await this.prisma.unitStock.update({
      where: {
        id: unitStockUpdate.id,
      },
      data: UnitStockPrismaMapper.toSave(unitStockUpdate),
    });

    return UnitStockPrismaMapper.toDomain(unitStock);
  }

  async updateQuantityUnitStockById(
    id: number,
    quantity: number,
  ): Promise<void> {
    await this.prisma.unitStock.update({
      where: { id },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    });
  }
}
