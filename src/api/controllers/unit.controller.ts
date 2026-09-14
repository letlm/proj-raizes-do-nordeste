import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UnitRequestDto } from 'src/application/unit/dto/unitRequest.dto';
import { UnitUpdateDto } from 'src/application/unit/dto/unitUpdate.dto';
import { UnitService } from 'src/application/unit/unit.service';

@Controller('unidades')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  create(@Body() dto: UnitRequestDto) {
    return this.unitService.create(dto);
  }

  @Get()
  findAll() {
    return this.unitService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.unitService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UnitUpdateDto,
  ) {
    return this.unitService.update(id, dto);
  }
}
