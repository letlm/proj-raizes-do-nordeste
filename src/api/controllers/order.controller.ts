import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/application/authentication/guards/jwt.auth.guard';
import { RolesGuard } from 'src/application/authentication/guards/roles.guard';
import { Roles } from 'src/application/decorators/roles.decorator';
import { OrderRequestDto } from 'src/application/order/dto/orderRequest.dto';
import { OrderUpdateDto } from 'src/application/order/dto/orderUpdate.dto';
import { OrderService } from 'src/application/order/order.service';
import { OrderChannel } from 'src/domain/enums/order';
import { TypeUser } from 'src/domain/enums/user.enum';

@ApiTags('Pedidos')
@Controller('pedidos')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TypeUser.CLIENTE, TypeUser.ATENDENTE)
  @ApiOperation({ summary: 'Criar um pedido' })
  @ApiBody({ type: OrderRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Pedido criado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados ou regras inválidos.',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não autorizado.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cliente, usuário, unidade produto ou estoque não encontrados',
  })
  create(@Body() dto: OrderRequestDto, @Req() request) {
    return this.orderService.create(dto, request.user);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TypeUser.ADMIN, TypeUser.GERENTE, TypeUser.ATENDENTE, TypeUser.COZINHA)
  @ApiOperation({ summary: 'Listar todos pedidos' })
  @ApiResponse({
    status: 200,
    description: 'Pedidos retornados com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos.',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não autorizado.',
  })
  @ApiQuery({
    name: 'canalPedido',
    enum: OrderChannel,
    required: false,
    description: 'Filtra os pedidos pelo canal de origem',
  })
  findAll(
    @Query(
      'canalPedido',
      new ParseEnumPipe(OrderChannel, {
        optional: true,
      }),
    )
    canalPedido?: OrderChannel,
  ) {
    return this.orderService.findAll(canalPedido);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TypeUser.ADMIN, TypeUser.GERENTE, TypeUser.ATENDENTE, TypeUser.COZINHA)
  @ApiOperation({ summary: 'Buscar pedido por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID do pedido',
  })
  @ApiResponse({
    status: 200,
    description: 'Pedido encontrado com sucesso.',
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
  @ApiResponse({
    status: 404,
    description: 'Pedido não encontrado.',
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findById(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TypeUser.COZINHA, TypeUser.ATENDENTE)
  @ApiOperation({ summary: 'Atualizar pedido por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID do pedido',
  })
  @ApiBody({ type: OrderUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'Pedido atualizado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados ou regras inválidos.',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'Este usuário não pode fazer essa alteração.',
  })
  @ApiResponse({
    status: 404,
    description: 'Pedido não encontrado',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: OrderUpdateDto,
    @Req() request,
  ) {
    return this.orderService.update(id, dto, request.user);
  }
}
