import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CancelRequestDto {
  @ApiProperty({ example: 1, description: 'Id do pedido' })
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({ example: 'Motivo do cancelamento' })
  @IsString()
  @IsNotEmpty()
  reason: string;
}
