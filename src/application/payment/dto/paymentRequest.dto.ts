import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { PaymentMethod } from 'src/domain/enums/payment.enum';

export class PaymentRequestDto {
  @IsNumber()
  @IsNotEmpty()
  orderId: number;

  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @IsOptional()
  @IsDateString()
  expirationDate: string;
}
