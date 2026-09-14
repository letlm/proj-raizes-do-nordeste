import { UnitStockInterface } from '../interfaces/unitStock.interface';

export class UnitStock {
  public readonly id: number | null;
  public quantity: number;
  public available: boolean;
  public unitId: number;
  public productId: number;

  constructor(props: UnitStockInterface, id: number | null = null) {
    this.id = id;
    this.quantity = props.quantity;
    this.available = props.available;
    this.unitId = props.unitId;
    this.productId = props.productId;
  }
}
