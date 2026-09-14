export interface UnitInterface {
  name: string;
  street: string;
  phone: string;
  city: string;
  state: string;
  number?: string | null;
  zipCode: string;
  active?: boolean;
}
