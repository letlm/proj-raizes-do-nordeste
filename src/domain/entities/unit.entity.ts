import { UnitInterface } from '../interfaces/unit.interface';

export class Unit {
  public readonly id: number | null;
  public name: string;
  public street: string;
  public phone: string;
  public city: string;
  public state: string;
  public active: boolean;
  public number: string | null;
  public zipCode: string;

  constructor(props: UnitInterface, id: number | null = null) {
    this.id = id;
    this.name = props.name;
    this.street = props.street;
    this.phone = props.phone;
    this.city = props.city;
    this.state = props.state;
    this.active = props.active ?? true;
    this.number = props.number;
    this.zipCode = props.zipCode;
  }
}
