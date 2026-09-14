import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductRequestDto } from 'src/application/product/dto/productRequest.dto';
import { ProductUpdateDto } from 'src/application/product/dto/productUpdate.dto';
import { ProductService } from 'src/application/product/product.service';

@Controller('produtos')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() dto: ProductRequestDto) {
    return this.productService.create(dto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findById(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ProductUpdateDto,
  ) {
    return this.productService.update(id, dto);
  }
}
