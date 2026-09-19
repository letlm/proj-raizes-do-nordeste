import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UnitRequestDto } from 'src/application/unit/dto/unitRequest.dto';
import { UnitUpdateDto } from 'src/application/unit/dto/unitUpdate.dto';
import { UnitService } from 'src/application/unit/unit.service';

@ApiTags('Unidades')
@Controller('unidades')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma unidade' })
  @ApiBody({ type: UnitRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Unidade criada com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos.',
  })
  create(@Body() dto: UnitRequestDto) {
    return this.unitService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas unidades' })
  @ApiResponse({
    status: 200,
    description: 'Unidades retornadas com sucesso.',
  })
  findAll() {
    return this.unitService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar unidade por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID da unidade',
  })
  @ApiResponse({
    status: 200,
    description: 'Unidade encontrada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Unidade não encontrada.',
  })
  @ApiResponse({
    status: 400,
    description: 'ID inválido.',
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.unitService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma unidade' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID da unidade',
  })
  @ApiBody({ type: UnitUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'Unidade atualizada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Unidade não encontrada.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UnitUpdateDto,
  ) {
    return this.unitService.update(id, dto);
  }
}
