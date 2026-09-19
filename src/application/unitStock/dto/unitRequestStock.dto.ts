import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UnitRequestStockDto {
  @ApiProperty({ example: 3 })
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ example: true })
  @IsBoolean()
  available: boolean;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  unitId?: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber()
  productId?: number;
}
