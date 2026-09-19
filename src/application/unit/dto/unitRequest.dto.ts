import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UnitRequestDto {
  @ApiProperty({ example: 'Nome da Unidade' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Rua da Unidade',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ example: '99999999999' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'Cidade da Unidade' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: 'Estado da Unidade' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ example: 'Número da Unidade' })
  @IsOptional()
  @IsString()
  number?: string;

  @ApiProperty({ example: 'CEP da Unidade' })
  @IsNotEmpty()
  @IsString()
  zipCode: string;
}
