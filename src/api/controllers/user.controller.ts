import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserRequestDto } from 'src/application/user/dto/userRequest.dto';
import { UserUpdateDto } from 'src/application/user/dto/userUpdate.dto';
import { UserService } from 'src/application/user/user.service';

@Controller('usuarios')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: UserRequestDto) {
    return this.userService.create(dto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UserUpdateDto,
  ) {
    return this.userService.update(id, dto);
  }
}
