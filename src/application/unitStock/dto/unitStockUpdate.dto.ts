import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UnitStockUpdateDto {
  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsBoolean()
  @IsOptional()
  available?: boolean;

  @IsOptional()
  @IsNumber()
  unitId?: number;

  @IsOptional()
  @IsNumber()
  productId?: number;
}
