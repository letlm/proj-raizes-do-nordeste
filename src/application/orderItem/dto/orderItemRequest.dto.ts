import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderItemRequestDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  orderId: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;
}
