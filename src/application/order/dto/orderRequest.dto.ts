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
import { ApiProperty } from '@nestjs/swagger';

export class OrderRequestDto {
  @ApiProperty({
    enum: OrderChannel,
    example: OrderChannel.BALCAO,
  })
  @IsEnum(OrderChannel)
  orderChannel: OrderChannel;

  @ApiProperty({ example: 1, description: 'ID do cliente' })
  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  @ApiProperty({ example: 1, description: 'ID de quem está criando o pedido' })
  @IsNumber()
  @IsNotEmpty()
  createdById: number;

  @ApiProperty({ example: 1, description: 'ID da unidade' })
  @IsNumber()
  @IsNotEmpty()
  unitId: number;

  @ApiProperty({ example: 1, description: 'ID da campanha', required: false })
  @IsNumber()
  @IsOptional()
  campaignId?: number;

  @ApiProperty({
    type: () => [ItemRequestDto],
    description: 'Itens do pedido',
    minItems: 1,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => ItemRequestDto)
  items: ItemRequestDto[];
}
