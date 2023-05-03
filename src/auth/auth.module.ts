import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
    }),
  ],
})
export class AuthModule {}
