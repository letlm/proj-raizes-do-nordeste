import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { TypeUser } from 'src/domain/enums/user.enum';

export class EmployeeRequestDto {
  @ApiProperty({ example: 'Nome e Sobrenome' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'email@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '99999999999' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    enum: TypeUser,
    example: TypeUser.ATENDENTE,
  })
  @IsEnum(TypeUser)
  profile: TypeUser;

  @ApiProperty({
    example: 'Senha@123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  unitId: number;
}
