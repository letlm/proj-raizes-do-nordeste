import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UnitRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsNotEmpty()
  @IsString()
  zipCode: string;
}
