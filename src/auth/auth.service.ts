import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import CreateAuthDto from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private expiresIn = '10 days';
  private issuer = 'giovanni';

  async signUp(userDto: CreateAuthDto) {
    const user = await this.userService.getByEmail(userDto.email);
    if (user) throw new ConflictException();
    return this.userService.create(userDto);
  }

  async signIn(userDto: CreateAuthDto) {
    const user = await this.userService.getByEmail(userDto.email);
    if (!user) throw new NotFoundException();

    const valid = bcrypt.compareSync(userDto.password, user.password);

    if (!valid) throw new NotAcceptableException();

    return this.createToken(user);
  }

  private createToken(user: User): string {
    return this.jwtService.sign(
      {
        email: user.email,
      },
      {
        expiresIn: this.expiresIn,
        issuer: this.issuer,
        subject: String(user.id),
      },
    );
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
      });

      return data;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }
}
