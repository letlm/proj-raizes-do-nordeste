import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductUpdateDto {
  @ApiPropertyOptional({ example: 'Nome do produto', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'Descrição do produto', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 15.99, required: false })
  @IsNumber()
  @IsOptional()
  price?: number;
}
