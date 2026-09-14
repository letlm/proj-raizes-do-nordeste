import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UnitRequestStockDto } from './dto/unitRequestStock.dto';
import { UnitStockRepository } from 'src/domain/repositories/unitStock.repository';
import { UnitStock } from 'src/domain/entities/unitStock.entity';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { UnitRepository } from 'src/domain/repositories/unit.repository';
import { UnitStockUpdateDto } from './dto/unitStockUpdate.dto';

@Injectable()
export class UnitStockService {
  constructor(
    private readonly repository: UnitStockRepository,
    private readonly productRepository: ProductRepository,
    private readonly unitRepository: UnitRepository,
  ) {}

  async create(dto: UnitRequestStockDto): Promise<UnitStock> {
    await this.isCombinationExists(dto.productId, dto.unitId);

    await this.validUnitAndProductExists(dto.productId, dto.unitId);

    this.validQuantity(dto.quantity);

    const unitStock = new UnitStock({
      quantity: dto.quantity,
      available: dto.available,
      unitId: dto.unitId,
      productId: dto.productId,
    });

    return await this.repository.create(unitStock);
  }

  async findById(id: number): Promise<UnitStock> {
    const unitStock = await this.repository.findById(id);

    if (!unitStock) {
      throw new NotFoundException('Estoque da Unidade não encontrado');
    }

    return unitStock;
  }

  async findAll(): Promise<UnitStock[]> {
    return await this.repository.findAll();
  }

  async update(id: number, dto: UnitStockUpdateDto): Promise<UnitStock> {
    const unitStock = await this.repository.findById(id);

    if (!unitStock) {
      throw new NotFoundException('Estoque da Unidade não encontrado');
    }

    if (dto.quantity !== undefined) {
      this.validQuantity(dto.quantity);
    }

    const product = dto.productId ?? unitStock.productId;
    const unit = dto.unitId ?? unitStock.unitId;

    if (dto.productId !== undefined || dto.unitId !== undefined) {
      await this.validProductByUnitForUpdate(id, product, unit);
    }

    await this.validUnitAndProductExists(product, unit);

    if (dto.available !== undefined) {
      unitStock.available = dto.available;
    }

    if (dto.quantity !== undefined) {
      unitStock.quantity = dto.quantity;
    }

    unitStock.unitId = unit;

    unitStock.productId = product;

    return await this.repository.update(unitStock);
  }

  private async validProductByUnitForUpdate(
    id: number,
    productId: number,
    unitId: number,
  ): Promise<void> {
    const unitStock = await this.repository.findByProductAndUnit(
      productId,
      unitId,
    );

    if (unitStock && unitStock.id !== id) {
      throw new ConflictException(
        'Já existe um cadastro para esse produto nesta unidade!',
      );
    }
  }

  private async isCombinationExists(
    productId: number,
    unitId: number,
  ): Promise<void> {
    const unitStock = await this.repository.findByProductAndUnit(
      productId,
      unitId,
    );

    if (unitStock) {
      throw new ConflictException(
        'Já existe um cadastro para esse produto nesta unidade!',
      );
    }
  }

  private async validUnitAndProductExists(
    productId: number,
    unitId: number,
  ): Promise<void> {
    const product = await this.productRepository.findById(productId);

    if (!product) {
      throw new NotFoundException('Produto não existe no sistema');
    }

    const unit = await this.unitRepository.findById(unitId);

    if (!unit) {
      throw new NotFoundException('Unidade não existe no sistema');
    }
  }

  private validQuantity(quantity?: number): void {
    if (quantity === undefined || quantity < 0) {
      throw new BadRequestException(
        'Quantidade deve ser igual ou maior que zero.',
      );
    }
  }
}
