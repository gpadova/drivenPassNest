import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(user: CreateUserDto) {
    return await this.usersRepository.create({
      ...user,
    });
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id);

    if (!user) throw new NotFoundException();

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.getByEmail(email);
    return user;
  }

  async remove(id: number) {
    return await this.usersRepository.remove(id);
  }
}
