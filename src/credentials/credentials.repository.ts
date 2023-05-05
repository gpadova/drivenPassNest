import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import Cryptr from 'cryptr';

@Injectable()
export class CredentialsRepository {
  private cryptr: Cryptr;

  constructor(private readonly prisma: PrismaService) {
    this.cryptr = new Cryptr(process.env.CRYPTR_SECRET);
  }

  create(user: User, body: CreateCredentialDto) {
    return this.prisma.credential.create({
      data: {
        username: user.email,
        password: this.cryptr.encrypt(user.password),
        title: body.title,
        url: body.url,
        userId: user.id,
      },
    });
  }

  async findAll(user: User) {
    const credentials = await this.prisma.credential.findMany({
      where: {
        userId: user.id,
      },
    });
    return credentials.map((credential) => {
      return {
        ...credential,
        password: this.cryptr.decrypt(credential.password),
      };
    });
  }

  async findOne(id: number, user: User) {
    const credential = await this.prisma.credential.findFirst({
      where: {
        userId: user.id,
        id,
      },
    });

    return {
      ...credential,
      password: this.cryptr.decrypt(credential.password),
    };
  }

  remove(id: number, user: User) {
    return this.prisma.credential.deleteMany({
      where: {
        id,
        userId: user.id,
      },
    });
  }
}
