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
import { OrderRequestDto } from 'src/application/order/dto/orderRequest.dto';
import { OrderService } from 'src/application/order/order.service';

@ApiTags('Pedidos')
@Controller('pedidos')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um pedido' })
  @ApiBody({ type: OrderRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Pedido criado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos.',
  })
  create(@Body() dto: OrderRequestDto) {
    return this.orderService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos pedidos' })
  @ApiResponse({
    status: 200,
    description: 'Pedidos retornados com sucesso.',
  })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
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
    status: 404,
    description: 'Pedido não encontrado.',
  })
  @ApiResponse({
    status: 400,
    description: 'ID inválido.',
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findById(id);
  }
  /*

  

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: OrderUpdateDto,
  ) {
    return this.orderService.update(id, dto);
  }*/
}
