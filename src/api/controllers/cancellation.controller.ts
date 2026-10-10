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
import { CancellationService } from 'src/application/cancellation/cancellation.service';
import { CancelRequestDto } from 'src/application/cancellation/dto/CancelRequest.dto';
import { Roles } from 'src/application/decorators/roles.decorator';
import { TypeUser } from 'src/domain/enums/user.enum';

@ApiTags('Cancelamento')
@Controller('cancelamentos')
export class CancellationController {
  constructor(private readonly cancelService: CancellationService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TypeUser.CLIENTE, TypeUser.ATENDENTE)
  @ApiOperation({ summary: 'Realizar um cancelamento' })
  @ApiBody({ type: CancelRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Cancelamento realizado com sucesso.',
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
    description: 'Pedido ou estoque do produto não encontrado',
  })
  create(@Body() dto: CancelRequestDto, @Req() request) {
    return this.cancelService.create(dto, request.user);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TypeUser.ADMIN, TypeUser.GERENTE, TypeUser.ATENDENTE)
  @ApiOperation({ summary: 'Listar todos cancelamentos' })
  @ApiResponse({
    status: 200,
    description: 'Cancelamentos retornados com sucesso.',
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
    return this.cancelService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TypeUser.ADMIN, TypeUser.GERENTE, TypeUser.ATENDENTE)
  @ApiOperation({ summary: 'Buscar cancelamento por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID do cancelamento',
  })
  @ApiResponse({
    status: 200,
    description: 'Cancelamento encontrado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Cancelamento não encontrado.',
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
    return this.cancelService.findById(id);
  }
}
