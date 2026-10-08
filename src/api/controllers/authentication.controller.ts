import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthenticationService } from 'src/application/authentication/authentication.service';
import { LoginRequestDto } from 'src/application/authentication/dto/loginRequest.dto';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Realizar o login' })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso!',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciais inválidas',
  })
  async login(@Body() dto: LoginRequestDto) {
    return this.authService.login(dto);
  }
}
