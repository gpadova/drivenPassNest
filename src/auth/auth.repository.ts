import { Injectable } from '@nestjs/common';
import CreateAuthDto from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async checksIfUserExists(user: CreateAuthDto): Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });
  }

  async signUpRep(user: CreateAuthDto): Promise<User> {
    const bcryptedPassword = await bcrypt.hash(user.password, 10);

    return await this.prisma.user.create({
      data: {
        email: user.email,
        password: bcryptedPassword,
      },
    });
  }

  signInRep(createAuthDto: CreateAuthDto): any {
    return createAuthDto;
  }
}
