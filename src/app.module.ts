import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { CredentialsModule } from './credentials/credentials.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    JwtModule,
    UsersModule,
    CredentialsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
