export interface MenuByUnitInterface {
  quantity: number;
  available: boolean;
  product: {
    name: string;
    description: string;
    price: number;
    active: boolean;
  };
}
