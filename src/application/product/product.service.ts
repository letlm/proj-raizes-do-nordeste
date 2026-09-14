import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { ProductRequestDto } from './dto/productRequest.dto';
import { Product } from 'src/domain/entities/product.entity';
import { ProductUpdateDto } from './dto/productUpdate.dto';

@Injectable()
export class ProductService {
  constructor(private readonly repository: ProductRepository) {}

  async create(dto: ProductRequestDto): Promise<Product> {
    const product = new Product({
      name: dto.name,
      description: dto.description,
      price: dto.price,
    });

    return await this.repository.create(product);
  }

  async findById(id: number): Promise<Product> {
    const product = await this.repository.findById(id);

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.repository.findAll();

    return products.map((product) => product);
  }

  async update(id: number, dto: ProductUpdateDto): Promise<Product> {
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
  }
}
