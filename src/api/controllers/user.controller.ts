import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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
import { Roles } from 'src/application/decorators/roles.decorator';
import { EmployeeRequestDto } from 'src/application/user/dto/employeeRequest.dto';
import { UserRequestDto } from 'src/application/user/dto/userRequest.dto';
import { UserUpdateDto } from 'src/application/user/dto/userUpdate.dto';
import { UserService } from 'src/application/user/user.service';
import { TypeUser } from 'src/domain/enums/user.enum';

@ApiTags('Usuários')
@Controller('usuarios')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um usuário' })
  @ApiBody({ type: UserRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos.',
  })
  @ApiResponse({
    status: 409,
    description: 'Email já cadastrado',
  })
  create(@Body() dto: UserRequestDto) {
    return this.userService.create(dto);
  }

  @Post('/funcionarios')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TypeUser.ADMIN)
  @ApiOperation({ summary: 'Criar um funcionário' })
  @ApiBody({ type: EmployeeRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso.',
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
    description: 'Unidade não encontrada',
  })
  @ApiResponse({
    status: 409,
    description: 'Email já cadastrado',
  })
  createEmployee(@Body() dto: EmployeeRequestDto) {
    return this.userService.createEmployee(dto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TypeUser.ADMIN)
  @ApiOperation({ summary: 'Listar todos usuários' })
  @ApiResponse({
    status: 200,
    description: 'Usuários retornados com sucesso.',
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
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TypeUser.ADMIN)
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID do usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário encontrado com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado.',
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
    return this.userService.findById(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(TypeUser.ADMIN, TypeUser.CLIENTE)
  @ApiOperation({ summary: 'Atualizar um usuário' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: 'ID do usuário',
  })
  @ApiBody({ type: UserUpdateDto })
  @ApiResponse({
    status: 200,
    description: 'Usuário atualizado com sucesso.',
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
    description: 'Usuário ou unidade não encontrados',
  })
  @ApiResponse({
    status: 409,
    description: 'Email já cadastrado',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UserUpdateDto,
    @Req() request,
  ) {
    return this.userService.update(id, dto, request.user);
  }
}
