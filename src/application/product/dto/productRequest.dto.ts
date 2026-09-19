import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductRequestDto {
  @ApiProperty({ example: 'Nome do produto' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Descrição do produto' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 15.99 })
  @IsNumber()
  @IsNotEmpty()
  price: number;
}
