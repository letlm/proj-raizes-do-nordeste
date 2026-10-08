import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsEmail()
  @ApiProperty({ example: 'email@email.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Senha@123',
  })
  password: string;
}
