import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { OrderStatus } from 'src/domain/enums/order';

export class OrderUpdateDto {
  @ApiProperty({
    enum: OrderStatus,
    example: OrderStatus.EM_PREPARO,
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
