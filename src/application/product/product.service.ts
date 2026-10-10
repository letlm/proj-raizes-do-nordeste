import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { ProductRequestDto } from './dto/productRequest.dto';
import { Product } from 'src/domain/entities/product.entity';
import { ProductUpdateDto } from './dto/productUpdate.dto';

@Injectable()
export class ProductService {
  private readonly loggerService = new Logger(ProductService.name);
  constructor(private readonly repository: ProductRepository) {}

  async create(dto: ProductRequestDto): Promise<Product> {
    try {
      const product = new Product({
        name: dto.name,
        description: dto.description,
        price: dto.price,
      });

      return await this.repository.create(product);
    } catch (error) {
      this.loggerService.error('Erro:', error);
      throw error;
    }
  }

  async findById(id: number): Promise<Product> {
    try {
      const product = await this.repository.findById(id);

      if (!product) {
        throw new NotFoundException('Produto não encontrado');
      }

      return product;
    } catch (error) {
      this.loggerService.error('Erro:', error);
      throw error;
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      const products = await this.repository.findAll();

      return products.map((product) => product);
    } catch (error) {
      this.loggerService.error('Erro:', error);
      throw error;
    }
  }

  async update(id: number, dto: ProductUpdateDto): Promise<Product> {
    try {
      const product = await this.repository.findById(id);

      if (!product) {
        throw new NotFoundException('Produto não encontrado');
      }

      if (dto.name !== undefined) {
        product.name = dto.name;
      }

      if (dto.description !== undefined) {
        product.description = dto.description;
      }

      if (dto.price !== undefined) {
        product.price = dto.price;
      }
      return await this.repository.update(product);
    } catch (error) {
      this.loggerService.error('Erro:', error);
      throw error;
    }
  }
}
