import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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
import { UnitRequestDto } from 'src/application/unit/dto/unitRequest.dto';
import { UnitUpdateDto } from 'src/application/unit/dto/unitUpdate.dto';
import { UnitService } from 'src/application/unit/unit.service';
import { UnitStockService } from 'src/application/unitStock/unitStock.service';
import { TypeUser } from 'src/domain/enums/user.enum';

@ApiTags('Unidades')
@Controller('unidades')
export class UnitController {
  constructor(
    private readonly unitService: UnitService,
    private readonly unitStockService: UnitStockService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TypeUser.ADMIN)
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
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não autorizado.',
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

  @Get(':id/cardapio')
  @ApiOperation({ summary: 'Buscar cardápio da unidade por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID da unidade',
  })
  @ApiResponse({
    status: 200,
    description: 'Cardápio retornado com sucesso',
  })
  @ApiResponse({
    status: 404,
    description: 'Não foi possível localizar a unidade.',
  })
  @ApiResponse({
    status: 400,
    description: 'ID inválido.',
  })
  async findProductsForMenuByUnitId(@Param('id', ParseIntPipe) id: number) {
    return this.unitStockService.findProductsForMenuByUnitId(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TypeUser.ADMIN)
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
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não autorizado.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UnitUpdateDto,
  ) {
    return this.unitService.update(id, dto);
  }
}
