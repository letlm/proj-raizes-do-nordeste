import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UnitRequestStockDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsBoolean()
  available: boolean;

  @IsOptional()
  @IsNumber()
  unitId?: number;

  @IsOptional()
  @IsNumber()
  productId?: number;
}
