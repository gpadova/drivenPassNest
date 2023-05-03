import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import CreateAuthDto from './dto/create-auth.dto';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly AuthRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: CreateAuthDto) {
    const userAlreadyExists = await this.AuthRepository.checksIfUserExists(
      user,
    );
    if (userAlreadyExists) throw new ForbiddenException();

    return await this.AuthRepository.signUpRep(user);
  }

  async signIn(user: CreateAuthDto) {
    const userAlreadyExists = await this.AuthRepository.checksIfUserExists(
      user,
    );

    if (!userAlreadyExists) throw new NotFoundException();

    const validPassword = await bcrypt.compare(
      user.password,
      userAlreadyExists.password,
    );
    if (!validPassword) throw new ForbiddenException();
    return this.createToken(userAlreadyExists);
  }

  private createToken(user) {
    return this.jwtService.sign(
      {
        email: user.email,
      },
      {
        expiresIn: '7 days',
      },
    );
  }
}
