import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { OrderChannel, OrderStatus } from 'src/domain/enums/order';

export class OrderUpdateDto {
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @IsEnum(OrderChannel)
  @IsOptional()
  orderChannel?: OrderChannel;

  @IsNumber()
  @IsOptional()
  customerId?: number;

  @IsNumber()
  @IsOptional()
  createdById?: number;

  @IsNumber()
  @IsOptional()
  unitId?: number;

  @IsNumber()
  @IsOptional()
  campaignId?: number;

  @IsNumber()
  @IsOptional()
  totalValue?: number;
}
