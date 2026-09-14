import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { Product } from 'src/domain/entities/product.entity';
import { ProductPrismaMapper } from '../mappers/productPrisma.mapper';

@Injectable()
export class ProductPrismaRepository extends ProductRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(newProduct: Product): Promise<Product> {
    const product = await this.prisma.product.create({
      data: ProductPrismaMapper.toSave(newProduct),
    });

    return ProductPrismaMapper.toDomain(product);
  }

  async findById(id: number): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    return product ? ProductPrismaMapper.toDomain(product) : null;
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();

    return products.map(ProductPrismaMapper.toDomain);
  }

  async update(productUpdate: Product): Promise<Product> {
    const product = await this.prisma.product.update({
      where: {
        id: productUpdate.id,
      },
      data: ProductPrismaMapper.toSave(productUpdate),
    });

    return ProductPrismaMapper.toDomain(product);
  }
}
