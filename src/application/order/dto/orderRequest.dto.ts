import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { OrderChannel } from 'src/domain/enums/order';
import { Type } from 'class-transformer';
import { ItemRequestDto } from '../item/itemRequest.dto';

export class OrderRequestDto {
  @IsEnum(OrderChannel)
  orderChannel: OrderChannel;

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

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ItemRequestDto)
  items: ItemRequestDto[];
}
