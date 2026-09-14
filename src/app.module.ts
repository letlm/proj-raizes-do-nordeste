import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { PrismaModule } from './infra/database/prisma/prisma.module';
import { HealthCheckModule } from './healthcheck/healthcheck.module';
import { UserModule } from './api/modules/user.module';
import { UnitModule } from './api/modules/unit.module';
import { ProductModule } from './api/modules/product.module';
import { UnitStockModule } from './api/modules/unitStock.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    HealthCheckModule,
    UserModule,
    UnitModule,
    ProductModule,
    UnitStockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
