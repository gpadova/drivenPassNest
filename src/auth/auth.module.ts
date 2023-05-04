import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersService, UsersRepository],
  imports: [
    JwtModule.register({
      secret: env.JWT_SECRET,
    }),
    UsersModule,
    PrismaModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
