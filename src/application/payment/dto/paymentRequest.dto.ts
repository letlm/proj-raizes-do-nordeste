import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { PaymentMethod } from 'src/domain/enums/payment.enum';

export class PaymentRequestDto {
  @ApiProperty({ example: 1, description: 'Id do pedido' })
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({
    enum: PaymentMethod,
    example: PaymentMethod.DEBITO,
  })
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @ApiProperty({
    example: '2027-10-31',
    description: 'Data de expiração do cartão',
  })
  @IsOptional()
  @IsDateString()
  expirationDate: string;
}
