import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';

@Injectable()
export class HealthCheckService {
  constructor(private readonly prisma: PrismaService) {}

  async check() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;

      return {
        status: 'OK',
        database: 'Serviço conectado',
      };
    } catch {
      throw new ServiceUnavailableException({
        status: 'ERROR',
        database: 'Serviço desconectado',
      });
    }
  }
}
