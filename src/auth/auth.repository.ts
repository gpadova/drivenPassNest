import { Injectable } from '@nestjs/common';
import CreateAuthDto from './dto/create-auth.dto';

@Injectable()
export class AuthRepository {
  signInRep(createAuthDto: CreateAuthDto): any {
    return createAuthDto;
  }

  signUpRep(createAuthDto: CreateAuthDto): any {
    return 'signUpWorked';
  }
}
