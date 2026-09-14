import { Product } from '../entities/product.entity';

export abstract class ProductRepository {
  abstract create(produto: Product): Promise<Product>;

  abstract findById(id: number): Promise<Product | null>;

  abstract findAll(): Promise<Product[]>;

  abstract update(produto: Product): Promise<Product>;
}
