import { UserInterface } from '../interfaces/user.interface';
import { TypeUser } from '../enums/user.enum';

export class User {
  public readonly id: number | null;
  public name: string;
  public email: string;
  public phone: string;
  public profile: TypeUser;
  public passHash: string;
  public active: boolean;
  public unitId?: number | null;

  constructor(props: UserInterface, id: number | null = null) {
    this.id = id;
    this.name = props.name;
    this.email = props.email;
    this.phone = props.phone;
    this.profile = props.profile;
    this.passHash = props.passHash;
    this.active = props.active ?? true;
    this.unitId = props.unitId;
  }
}
