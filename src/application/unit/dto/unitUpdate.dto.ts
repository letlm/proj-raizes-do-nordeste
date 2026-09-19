import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UnitUpdateDto {
  @ApiPropertyOptional({
    example: 'Nome da Unidade',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: 'Rua da Unidade',
    required: false,
  })
  @IsString()
  @IsOptional()
  street?: string;

  @ApiPropertyOptional({ example: '99999999999', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ example: 'Cidade da Unidade', required: false })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ example: 'Estado da Unidade', required: false })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ example: 'Número da Unidade', required: false })
  @IsOptional()
  @IsString()
  number?: string;

  @ApiPropertyOptional({ example: 'CEP da Unidade', required: false })
  @IsOptional()
  @IsString()
  zipCode?: string;
}
