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
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Estoque')
@Controller('estoque')
export class UnitStockController {
  constructor(private readonly unitStockService: UnitStockService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um estoque' })
  @ApiBody({ type: UnitRequestStockDto })
  @ApiResponse({
    status: 201,
    description: 'Estoque criado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos.',
  })
  create(@Body() dto: UnitRequestStockDto) {
    return this.unitStockService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos estoques' })
  @ApiResponse({
    status: 200,
    description: 'Estoques retornados com sucesso.',
  })
  findAll() {
    return this.unitStockService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar estoque por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID do estoque',
  })
  @ApiResponse({
    status: 200,
    description: 'Estoque encontrado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Estoque não encontrado.',
  })
  @ApiResponse({
    status: 400,
    description: 'ID inválido.',
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.unitStockService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um estoque' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID do estoque',
  })
  @ApiBody({ type: UnitStockUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'Estoque atualizado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Estoque não encontrado.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UnitStockUpdateDto,
  ) {
    return this.unitStockService.update(id, dto);
  }
}
