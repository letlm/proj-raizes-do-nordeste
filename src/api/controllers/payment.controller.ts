import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaymentRequestDto } from 'src/application/payment/dto/paymentRequest.dto';
import { PaymentService } from 'src/application/payment/payment.service';

@ApiTags('Pagamento')
@Controller('pagamento')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperation({ summary: 'Realizar um pagamento' })
  @ApiBody({ type: PaymentRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Pagamento realizado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos.',
  })
  create(@Body() dto: PaymentRequestDto) {
    return this.paymentService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos pagamentos' })
  @ApiResponse({
    status: 200,
    description: 'Pagamentos retornados com sucesso.',
  })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar pagamento por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID do pagamento',
  })
  @ApiResponse({
    status: 200,
    description: 'Pagamento encontrado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Pagamento não encontrado.',
  })
  @ApiResponse({
    status: 400,
    description: 'ID inválido.',
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.findById(id);
  }
}
