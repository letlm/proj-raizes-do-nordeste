import { Prisma } from 'generated/prisma/client';
import { Product } from 'src/domain/entities/product.entity';
type ProdutctRegister = Prisma.ProductGetPayload<{}>;

export class ProductPrismaMapper {
  static toDomain(register: ProdutctRegister): Product {
    return new Product(
      {
        name: register.name,
        active: register.active,
        description: register.description,
        price: register.price.toNumber(),
      },
      register.id,
    );
  }

  static toSave(product: Product) {
    return {
      name: product.name,
      active: product.active,
      description: product.description,
      price: product.price,
    };
  }
}
