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
import { UnitStockUpdateDto } from 'src/application/unitStock/dto/unitStockUpdate.dto';
import { UnitRequestStockDto } from 'src/application/unitStock/dto/unitRequestStock.dto';
import { UnitStockService } from 'src/application/unitStock/unitStock.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TypeUser } from 'src/domain/enums/user.enum';
import { JwtAuthGuard } from 'src/application/authentication/guards/jwt.auth.guard';
import { RolesGuard } from 'src/application/authentication/guards/roles.guard';
import { Roles } from 'src/application/decorators/roles.decorator';

@ApiTags('Estoque')
@Controller('estoque')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(TypeUser.ADMIN, TypeUser.GERENTE)
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
    description: 'Produto ou unidade não encontrados',
  })
  @ApiResponse({
    status: 409,
    description: 'Já existe um cadastro para esse produto nesta unidade!',
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
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não autorizado.',
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
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não autorizado.',
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
  @ApiResponse({
    status: 404,
    description: 'Estoque, produto ou unidade não encontrados',
  })
  @ApiResponse({
    status: 409,
    description: 'Já existe um cadastro para esse produto nesta unidade!',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UnitStockUpdateDto,
  ) {
    return this.unitStockService.update(id, dto);
  }
}
