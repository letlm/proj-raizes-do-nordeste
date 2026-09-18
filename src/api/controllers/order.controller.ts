import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderRequestDto } from 'src/application/order/dto/orderRequest.dto';
import { OrderUpdateDto } from 'src/application/order/dto/orderUpdate.dto';
import { OrderService } from 'src/application/order/order.service';

@ApiTags('Pedidos')
@Controller('pedidos')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() dto: OrderRequestDto) {
    return this.orderService.create(dto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
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
