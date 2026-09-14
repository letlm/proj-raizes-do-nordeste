import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UnitStockUpdateDto } from 'src/application/unitStock/dto/unitStockUpdate.dto';
import { UnitRequestStockDto } from 'src/application/unitStock/dto/unitRequestStock.dto';
import { UnitStockService } from 'src/application/unitStock/unitStock.service';

@Controller('estoque')
export class UnitStockController {
  constructor(private readonly unitStockService: UnitStockService) {}

  @Post()
  create(@Body() dto: UnitRequestStockDto) {
    return this.unitStockService.create(dto);
  }

  @Get()
  findAll() {
    return this.unitStockService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.unitStockService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UnitStockUpdateDto,
  ) {
    return this.unitStockService.update(id, dto);
  }
}
