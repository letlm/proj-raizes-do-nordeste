import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/application/authentication/guards/jwt.auth.guard';
import { RolesGuard } from 'src/application/authentication/guards/roles.guard';
import { Roles } from 'src/application/decorators/roles.decorator';
import { PaymentRequestDto } from 'src/application/payment/dto/paymentRequest.dto';
import { PaymentService } from 'src/application/payment/payment.service';
import { TypeUser } from 'src/domain/enums/user.enum';

@ApiTags('Pagamento')
@Controller('pagamento')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TypeUser.ATENDENTE, TypeUser.CLIENTE)
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
  @ApiResponse({
    status: 404,
    description: 'O pedido informado não existe!',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 403,
    description:
      'Usuário não autorizado ou o pedido não se encontra no status elegível para pagamento.',
  })
  create(@Body() dto: PaymentRequestDto, @Req() request) {
    return this.paymentService.create(dto, request.user);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TypeUser.ADMIN, TypeUser.GERENTE, TypeUser.ATENDENTE)
  @ApiOperation({ summary: 'Listar todos pagamentos' })
  @ApiResponse({
    status: 200,
    description: 'Pagamentos retornados com sucesso.',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não autorizado.',
  })
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TypeUser.ADMIN, TypeUser.GERENTE, TypeUser.ATENDENTE)
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
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não autorizado.',
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.findById(id);
  }
}
