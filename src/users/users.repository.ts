import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  private SALT = 10;

  async create(user: CreateUserDto) {
    const hashedPassword = bcrypt.hashSync(user.password, this.SALT);
    return this.prisma.user.create({
      data: {
        email: user.email,
        password: hashedPassword,
      },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async getByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
