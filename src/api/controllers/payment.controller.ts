import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentRequestDto } from 'src/application/payment/dto/paymentRequest.dto';
import { PaymentService } from 'src/application/payment/payment.service';

@ApiTags('Pagamento')
@Controller('pagamento')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() dto: PaymentRequestDto) {
    return this.paymentService.create(dto);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.findById(id);
  }
}
