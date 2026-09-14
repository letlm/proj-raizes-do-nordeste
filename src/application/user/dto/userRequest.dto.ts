import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TypeUser } from 'src/domain/enums/user.enum';

export class UserRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEnum(TypeUser)
  profile: TypeUser;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsNumber()
  unitId?: number;
}
