import { UserRepository } from 'src/domain/repositories/user.repository';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginRequestDto } from './dto/loginRequest.dto';

@Injectable()
export class AuthenticationService {
  private readonly loggerService = new Logger(AuthenticationService.name);
  constructor(
    private readonly repository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginRequestDto) {
    try {
      const user = await this.repository.findByEmail(dto.email);

      if (!user) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const password = await bcrypt.compare(dto.password, user.passHash);

      if (!password) {
        throw new UnauthorizedException('Credenciais inválidas');
      }

      const infosForToken = {
        id: user.id,
        profile: user.profile,
      };

      const token = this.jwtService.sign(infosForToken);

      return { accessToken: token };
    } catch (error) {
      this.loggerService.error('Erro:', error);
      throw error;
    }
  }
}
