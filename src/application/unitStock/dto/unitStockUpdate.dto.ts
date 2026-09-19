import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UnitStockUpdateDto {
  @ApiPropertyOptional({
    example: 3,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @ApiPropertyOptional({
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @ApiPropertyOptional({
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  unitId?: number;

  @ApiPropertyOptional({
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  productId?: number;
}
