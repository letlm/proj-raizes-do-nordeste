import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './healthcheck.service';

@Controller('healthcheck')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  check() {
    return this.healthCheckService.check();
  }
}
