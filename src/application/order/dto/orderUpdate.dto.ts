import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { OrderChannel, TypeStatus } from 'src/domain/enums/order';

export class OrderUpdateDto {
  @IsEnum(TypeStatus)
  @IsOptional()
  status?: string;

  @IsEnum(OrderChannel)
  @IsOptional()
  orderChannel?: string;

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
