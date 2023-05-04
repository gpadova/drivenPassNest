import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersRepository } from './users.repository';

@Module({
  imports: [PrismaModule],
  exports: [UsersService],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
