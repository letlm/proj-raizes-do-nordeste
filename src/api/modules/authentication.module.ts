import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationService } from 'src/application/authentication/authentication.service';
import { UserPrismaRepository } from 'src/infra/database/prisma/repositories/userPrisma.repository';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/application/authentication/jwt.strategy';
import { AuthenticationController } from '../controllers/authentication.controller';

@Module({
  controllers: [AuthenticationController],
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
  ],
  providers: [
    AuthenticationService,
    {
      provide: UserRepository,
      useClass: UserPrismaRepository,
    },
    JwtStrategy,
  ],
})
export class AuthenticationModule {}
