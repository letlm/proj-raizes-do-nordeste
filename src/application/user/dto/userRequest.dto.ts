import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserRequestDto {
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
    example: 'Senha@123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
