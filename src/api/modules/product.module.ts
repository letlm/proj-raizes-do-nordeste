import { Module } from '@nestjs/common';
import { ProductController } from 'src/api/controllers/product.controller';
import { ProductService } from 'src/application/product/product.service';
import { ProductRepository } from 'src/domain/repositories/product.repository';
import { ProductPrismaRepository } from 'src/infra/database/prisma/repositories/productPrisma.repository';

@Module({
  controllers: [ProductController],

  providers: [
    ProductService,
    {
      provide: ProductRepository,
      useClass: ProductPrismaRepository,
    },
  ],
})
export class ProductModule {}
