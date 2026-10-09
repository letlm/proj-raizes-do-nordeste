import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UnitRequestDto } from './dto/unitRequest.dto';
import { Unit } from 'src/domain/entities/unit.entity';
import { UnitRepository } from 'src/domain/repositories/unit.repository';
import { UnitUpdateDto } from './dto/unitUpdate.dto';

@Injectable()
export class UnitService {
  private readonly loggerService = new Logger(UnitService.name);
  constructor(private readonly repository: UnitRepository) {}

  async create(dto: UnitRequestDto): Promise<Unit> {
    try {
      const unit = new Unit({
        name: dto.name,
        street: dto.street,
        phone: dto.phone,
        state: dto.state,
        city: dto.city,
        zipCode: dto.zipCode,
        number: dto.number,
      });

      return await this.repository.create(unit);
    } catch (error) {
      this.loggerService.error('Erro:', error);
      throw error;
    }
  }

  async findById(id: number): Promise<Unit> {
    try {
      const unit = await this.repository.findById(id);

      if (!unit) {
        throw new NotFoundException('Unidade não encontrada');
      }

      return unit;
    } catch (error) {
      this.loggerService.error('Erro:', error);
      throw error;
    }
  }

  async findAll(): Promise<Unit[]> {
    try {
      const unidades = await this.repository.findAll();

      return unidades.map((unit) => unit);
    } catch (error) {
      this.loggerService.error('Erro:', error);
      throw error;
    }
  }

  async update(id: number, dto: UnitUpdateDto): Promise<Unit> {
    try {
      const unit = await this.repository.findById(id);

      if (!unit) {
        throw new NotFoundException('Unidade não encontrada');
      }

      if (dto.name !== undefined) {
        unit.name = dto.name;
      }

      if (dto.street !== undefined) {
        unit.street = dto.street;
      }

      if (dto.phone !== undefined) {
        unit.phone = dto.phone;
      }

      if (dto.city !== undefined) {
        unit.city = dto.city;
      }

      if (dto.zipCode !== undefined) {
        unit.zipCode = dto.zipCode;
      }

      if (dto.number !== undefined) {
        unit.number = dto.number;
      }

      if (dto.state !== undefined) {
        unit.state = dto.state;
      }

      return await this.repository.update(unit);
    } catch (error) {
      this.loggerService.error('Erro:', error);
      throw error;
    }
  }
}
