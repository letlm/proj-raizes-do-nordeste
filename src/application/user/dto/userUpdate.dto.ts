import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TypeUser } from 'src/domain/enums/user.enum';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEnum(TypeUser)
  @IsOptional()
  profile?: TypeUser;

  @IsString()
  @IsOptional()
  password?: string;

  @IsOptional()
  @IsNumber()
  unitId?: number | null;
}
