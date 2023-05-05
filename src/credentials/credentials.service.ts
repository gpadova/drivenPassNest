import { Injectable } from '@nestjs/common';
import { CreateCredentialDto } from './dto/create-credential.dto';
import { CredentialsRepository } from './credentials.repository';
import { User } from '@prisma/client';

@Injectable()
export class CredentialsService {
  constructor(private readonly credentialRepository: CredentialsRepository) {}

  create(user: User, body: CreateCredentialDto) {
    return this.credentialRepository.create(user, body);
  }

  findAll(user: User) {
    return this.credentialRepository.findAll(user);
  }

  findOne(id: number, user: User) {
    return this.credentialRepository.findOne(id, user);
  }

  remove(id: number, user: User) {
    return this.credentialRepository.remove(id, user);
  }
}
