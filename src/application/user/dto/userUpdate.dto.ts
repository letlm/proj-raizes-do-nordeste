import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { TypeUser } from 'src/domain/enums/user.enum';

export class UserUpdateDto {
  @ApiPropertyOptional({
    example: 'Nome e Sobrenome',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'email@email.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: '99999999999', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({
    enum: TypeUser,
    example: TypeUser.CLIENTE,
    required: false,
  })
  @IsEnum(TypeUser)
  @IsOptional()
  profile?: TypeUser;

  @ApiPropertyOptional({
    example: 'Senha@123',
    required: false,
  })
  @IsString()
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  unitId?: number | null;
}
