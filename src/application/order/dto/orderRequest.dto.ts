import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { OrderChannel, TypeStatus } from 'src/domain/enums/order';

export class OrderRequestDto {
  @IsEnum(TypeStatus)
  status: string;

  @IsEnum(OrderChannel)
  orderChannel: string;

  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  @IsNumber()
  @IsNotEmpty()
  createdById: number;

  @IsNumber()
  @IsNotEmpty()
  unitId: number;

  @IsNumber()
  @IsOptional()
  campaignId?: number;

  @IsNumber()
  @IsNotEmpty()
  totalValue: number;
}
