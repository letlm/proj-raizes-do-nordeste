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
import { ProductRequestDto } from 'src/application/product/dto/productRequest.dto';
import { ProductUpdateDto } from 'src/application/product/dto/productUpdate.dto';
import { ProductService } from 'src/application/product/product.service';
import { TypeUser } from 'src/domain/enums/user.enum';

@ApiTags('Produtos')
@Controller('produtos')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TypeUser.ADMIN, TypeUser.GERENTE)
  @ApiOperation({ summary: 'Criar um produto' })
  @ApiBody({ type: ProductRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Produto criado com sucesso.',
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
  create(@Body() dto: ProductRequestDto) {
    return this.productService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos produtos' })
  @ApiResponse({
    status: 200,
    description: 'Produtos retornados com sucesso.',
  })
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar produto por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID do produto',
  })
  @ApiResponse({
    status: 200,
    description: 'Produto encontrado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado.',
  })
  @ApiResponse({
    status: 400,
    description: 'ID inválido.',
  })
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findById(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TypeUser.ADMIN, TypeUser.GERENTE)
  @ApiOperation({ summary: 'Atualizar um produto' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID do produto',
  })
  @ApiBody({ type: ProductUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'Produto atualizado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado.',
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
    @Body() dto: ProductUpdateDto,
  ) {
    return this.productService.update(id, dto);
  }
}
