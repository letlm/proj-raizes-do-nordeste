import { IsNumber, IsOptional, IsString } from 'class-validator';

export class OrderItemUpdateDto {
  @IsString()
  @IsOptional()
  productId?: string;

  @IsString()
  @IsOptional()
  orderId?: string;

  @IsNumber()
  @IsOptional()
  amount?: number;

  @IsNumber()
  @IsOptional()
  unitPrice?: number;
}
