import { Injectable } from '@nestjs/common';
import CreateAuthDto from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly AuthRepository: AuthRepository) {}

  signUp(createAuthDto: CreateAuthDto): string {
    return this.AuthRepository.signUpRep(createAuthDto);
  }

  signIn(createAuthDto: CreateAuthDto): string {
    return this.AuthRepository.signUpRep(createAuthDto);
  }
}
