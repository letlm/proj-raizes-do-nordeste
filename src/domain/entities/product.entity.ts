import { ProductInterface } from '../interfaces/product.interface';

export class Product {
  public readonly id: number | null;
  public name: string;
  public description: string;
  public price: number;
  public active: boolean;

  constructor(props: ProductInterface, id: number | null = null) {
    this.id = id;
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.active = props.active ?? true;
  }
}
